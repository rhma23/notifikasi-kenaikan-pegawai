import supertest from "supertest";
import http from "http";
import { web } from "../../application/web.js";
import logger from "../../application/logging.js";
import {
  removeAllTestPosition,
  createTestUser,
  removeTestUser,
  createTestPosition,
  getTestPosition,
  createManyTestPositions,
} from "../position/test.util.js";
const server = http.createServer(web);

describe("POST /api/position", () => {
  beforeEach(async () => {
    await removeTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await removeAllTestPosition();
  });

  it("should create a new position", async () => {
    const result = await supertest(server)
      .post("/api/position")
      .set("Authorization", "test")
      .send({
        positionName: "test",
      });

    expect(result.statusCode).toBe(200);
    expect(result.body.data.positionName).toBe("test");
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(server)
      .post("/api/position")
      .set("Authorization", "test")
      .send({
        positionName: "",
      });
    console.log(result.body);
    expect(result.statusCode).toBe(400);

    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/position", () => {
  beforeEach(async () => {
    await createManyTestPositions();
  });

  afterEach(async () => {
    await removeAllTestPosition();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/position")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(2);
    expect(result.body.paging.totalItem).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/position")
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
      .get("/api/position")
      .query({
        positionName: "test 1",
      })
      .set("Authorization", "test");
    console.log("Position search result:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });
});

describe("GET /api/position/:positionId", () => {
  beforeEach(async () => {
    await removeAllTestPosition();
    await createTestPosition();
  });

  afterEach(async () => {
    await removeAllTestPosition();
  });

  it("should can get position by id", async () => {
    const testPosition = await getTestPosition();
    const result = await supertest(web)
      .get("/api/position/" + testPosition.positionId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.positionId).toBe(testPosition.positionId);
    expect(result.body.data.positionName).toBe("test");
  });

  it("should reject if token is invalid", async () => {
    const testPosition = await getTestPosition();
    const result = await supertest(web)
      .get("/api/position/" + testPosition.positionId)
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/position/:positionId", () => {
  beforeEach(async () => {
    await removeAllTestPosition();
    await createTestPosition();
  });

  afterEach(async () => {
    await removeAllTestPosition();
  });

  it("should can update position", async () => {
    const testPosition = await getTestPosition();
    const result = await supertest(web)
      .patch("/api/position/" + testPosition.positionId)
      .set("Authorization", "test")
      .send({
        positionName: "test update",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.positionId).toBe(testPosition.positionId);
    expect(result.body.data.positionName).toBe("test update");
  });

  it("should reject if request is invalid", async () => {
    const testPosition = await getTestPosition();
    const result = await supertest(web)
      .patch("/api/position/" + testPosition.positionId)
      .set("Authorization", "test")
      .send({
        positionName: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/position/:positionId", () => {
  beforeEach(async () => {
    await removeAllTestPosition();
    await createTestPosition();
  });

  afterEach(async () => {
    await removeAllTestPosition();
  });

  it("should can delete position", async () => {
    const testPosition = await getTestPosition();
    const result = await supertest(web)
      .delete("/api/position/" + testPosition.positionId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });
});
