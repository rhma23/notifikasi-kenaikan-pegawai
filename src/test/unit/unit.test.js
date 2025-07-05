import supertest from "supertest";
import http from "http";
import { web } from "../../application/web.js";
import logger from "../../application/logging.js";
import {
  removeAllTestUnit,
  createTestUser,
  removeTestUser,
  createTestUnit,
  getTestUnit,
  createManyTestUnits,
} from "../unit/test.util.js";
const server = http.createServer(web);

describe("POST /api/unit", () => {
  beforeEach(async () => {
    await removeTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await removeAllTestUnit();
  });

  it("should create a new unit", async () => {
    const result = await supertest(server)
      .post("/api/unit")
      .set("Authorization", "test")
      .send({
        unitName: "test",
      });

    expect(result.statusCode).toBe(200);
    expect(result.body.data.unitName).toBe("test");
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(server)
      .post("/api/unit")
      .set("Authorization", "test")
      .send({
        unitName: "",
      });
    console.log(result.body);
    expect(result.statusCode).toBe(400);

    expect(result.body.errors).toBeDefined();
  });
});

// describe("GET /api/unit", () => {
//   beforeEach(async () => {
//     await createTestUnit();
//   });

//   afterEach(async () => {
//     await removeAllTestUnit();
//   });

//   it("should can get unit", async () => {
//     const result = await supertest(web)
//       .get("/api/unit")
//       .set("Authorization", "test");

//     expect(result.status).toBe(200);
//     expect(result.body.data.unitName).toBe("test");
//   });

//   it("should reject if token is invalid", async () => {
//     const result = await supertest(web)
//       .get("/api/unit")
//       .set("Authorization", "test");
//   });

//   it("should reject if token is invalid", async () => {
//     const result = await supertest(web)
//       .get("/api/unit")
//       .set("Authorization", "salah");

//     expect(result.status).toBe(401);
//     expect(result.body.errors).toBeDefined();
//   });
// });

describe("GET /api/unit", () => {
  beforeEach(async () => {
    await createManyTestUnits();
  });

  afterEach(async () => {
    await removeAllTestUnit();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/unit")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(2);
    expect(result.body.paging.totalItem).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/unit")
      .query({
        page: 2,
      })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.totalPage).toBe(2);
    expect(result.body.paging.totalItem).toBe(15);
  });

  it("should can search using name", async () => {
    const result = await supertest(web)
      .get("/api/unit")
      .query({
        unitName: "test 1",
      })
      .set("Authorization", "test");
    console.log("Unit search result:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });
});

describe("GET /api/unit/:unitId", () => {
  beforeEach(async () => {
    await removeAllTestUnit();
    await createTestUnit();
  });

  afterEach(async () => {
    await removeAllTestUnit();
  });

  it("should can get unit by id", async () => {
    const testUnit = await getTestUnit();
    console.log("testUnit", testUnit);
    const result = await supertest(web)
      .get("/api/unit/" + testUnit.unitId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.unitId).toBe(testUnit.unitId);
    expect(result.body.data.unitName).toBe("test");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/unit")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/unit/:unitId", () => {
  beforeEach(async () => {
    await removeAllTestUnit();
    await createTestUnit();
  });

  afterEach(async () => {
    await removeAllTestUnit();
  });

  it("should can update unit", async () => {
    const testUnit = await getTestUnit();
    const result = await supertest(web)
      .patch("/api/unit/" + testUnit.unitId)
      .set("Authorization", "test")
      .send({
        unitName: "test update",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.unitId).toBe(testUnit.unitId);
    expect(result.body.data.unitName).toBe("test update");
  });

  it("should reject if request is invalid", async () => {
    const testUnit = await getTestUnit();
    const result = await supertest(web)
      .patch("/api/unit/" + testUnit.unitId)
      .set("Authorization", "test")
      .send({
        unitName: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/unit/:unitId", () => {
  beforeEach(async () => {
    await removeAllTestUnit();
    await createTestUnit();
  });

  afterEach(async () => {
    await removeAllTestUnit();
  });

  it("should can delete unit", async () => {
    const testUnit = await getTestUnit();
    const result = await supertest(web)
      .delete("/api/unit/" + testUnit.unitId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });
});
