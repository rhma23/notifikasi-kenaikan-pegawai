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

describe("GET /api/branch", () => {
  beforeEach(async () => {
    await createTestBranch();
  });

  afterEach(async () => {
    await removeAllTestBranch();
  });

  it("should can get branch", async () => {
    const result = await supertest(web)
      .get("/api/branch")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.branchName).toBe("test");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/branch")
      .set("Authorization", "test");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/branch")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

// describe("GET /api/branch/:branchId", () => {
//   beforeEach(async () => {
//     await createTestBranch();
//   });

//   afterEach(async () => {
//     await removeAllTestBranch();
//   });

//   it("should can get branch by id", async () => {
//     const testBranch = await getTestBranch();
//     console.log("tesBranch", testBranch);
//     const result = await supertest(web)
//       .get("/api/contacts/" + testBranch.branchId)
//       .set("Authorization", "test");

//     expect(result.status).toBe(200);
//     expect(result.body.data.branchId).toBe(testBranch.branchId);
//     expect(result.body.data.branchName).toBe("test");
//   });

//     it("should reject if token is invalid", async () => {
//       const result = await supertest(web)
//         .get("/api/branch")
//         .set("Authorization", "test");
//     });

//     it("should reject if token is invalid", async () => {
//       const result = await supertest(web)
//         .get("/api/branch")
//         .set("Authorization", "salah");

//       expect(result.status).toBe(401);
//       expect(result.body.errors).toBeDefined();
//     });
// });
