import supertest from "supertest";
import http from "http";
import { web } from "../application/web.js";
import logger from "../application/logging.js";
import {
  removeAllTestBranch,
  createTestUser,
  removeTestUser,
  createTestBranch,
  getTestBranch,
  createManyTestBranches,
} from "./test.util.js";
import bcrypt from "bcrypt";
const server = http.createServer(web);

describe("POST /api/users/create", () => {
  beforeEach(async () => {
    await removeTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await removeAllTestBranch();
  });

  it("should create a new branch", async () => {
    const result = await supertest(server)
      .post("/api/branch")
      .set("Authorization", "test")
      .send({
        branchName: "test",
      });

    expect(result.statusCode).toBe(200);
    expect(result.body.data.branchName).toBe("test");
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(server)
      .post("/api/branch")
      .set("Authorization", "test")
      .send({
        branchName: "",
      });
    console.log(result.body);
    expect(result.statusCode).toBe(400);

    expect(result.body.errors).toBeDefined;
  });
});

// describe("GET /api/branch", () => {
//   beforeEach(async () => {
//     await createTestBranch();
//   });

//   afterEach(async () => {
//     await removeAllTestBranch();
//   });

//   it("should can get branch", async () => {
//     const result = await supertest(web)
//       .get("/api/branch")
//       .set("Authorization", "test");

//     expect(result.status).toBe(200);
//     expect(result.body.data.branchName).toBe("test");
//   });

//   it("should reject if token is invalid", async () => {
//     const result = await supertest(web)
//       .get("/api/branch")
//       .set("Authorization", "test");
//   });

//   it("should reject if token is invalid", async () => {
//     const result = await supertest(web)
//       .get("/api/branch")
//       .set("Authorization", "salah");

//     expect(result.status).toBe(401);
//     expect(result.body.errors).toBeDefined();
//   });
// });

describe("GET /api/branch", () => {
  beforeEach(async () => {
    await createManyTestBranches();
  });

  afterEach(async () => {
    await removeAllTestBranch();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/branch")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(2);
    expect(result.body.paging.totalItem).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/branch")
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
      .get("/api/branch")
      .query({
        branchName: "test 1",
      })
      .set("Authorization", "test");
    console.log("Branch search result:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });
});

describe("GET /api/branch/:branchId", () => {
  beforeEach(async () => {
    await removeAllTestBranch();
    await createTestBranch();
  });

  afterEach(async () => {
    await removeAllTestBranch();
  });

  it("should can get branch by id", async () => {
    const testBranch = await getTestBranch();

    const result = await supertest(web)
      .get("/api/branch/" + testBranch.branchId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.branchId).toBe(testBranch.branchId);
    expect(result.body.data.branchName).toBe("test");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/branch")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/branch/:branchId", () => {
  beforeEach(async () => {
    await removeAllTestBranch();
    await createTestBranch();
  });

  afterEach(async () => {
    await removeAllTestBranch();
  });

  it("should can update branch", async () => {
    const testBranch = await getTestBranch();
    const result = await supertest(web)
      .patch("/api/branch/" + testBranch.branchId)
      .set("Authorization", "test")
      .send({
        branchName: "test update",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.branchId).toBe(testBranch.branchId);
    expect(result.body.data.branchName).toBe("test update");
  });

  it("should reject if request is invalid", async () => {
    const testBranch = await getTestBranch();
    const result = await supertest(web)
      .patch("/api/branch/" + testBranch.branchId)
      .set("Authorization", "test")
      .send({
        branchName: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/branch/:branchId", () => {
  beforeEach(async () => {
    await removeAllTestBranch();
    await createTestBranch();
  });

  afterEach(async () => {
    await removeAllTestBranch();
  });

  it("should can delete branch", async () => {
    const testBranch = await getTestBranch();
    const result = await supertest(web)
      .delete("/api/branch/" + testBranch.branchId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });
});
