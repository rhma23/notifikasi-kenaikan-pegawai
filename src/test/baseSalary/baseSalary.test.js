import supertest from "supertest";
import http from "http";
import { web } from "../../application/web.js";
import logger from "../../application/logging.js";
import {
  removeAllTestBaseSalary,
  createTestUser,
  removeTestUser,
  createTestBaseSalary,
  getTestBaseSalary,
  createManyTestBaseSalary,
} from "../baseSalary/test.util.js";
const server = http.createServer(web);

describe("POST /api/base-salary", () => {
  beforeEach(async () => {
    await removeTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await removeAllTestBaseSalary();
  });

  it("should create a new base salary", async () => {
    const result = await supertest(server)
      .post("/api/base-salary")
      .set("Authorization", "test")
      .send({
        amount: 1000000,
        type: "test",
        yearsOfService: "1",
      });

    expect(result.statusCode).toBe(200);
    expect(result.body.data.amount).toBe(1000000);
    expect(result.body.data.type).toBe("test");
    expect(result.body.data.yearsOfService).toBe("1");
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(server)
      .post("/api/base-salary")
      .set("Authorization", "test")
      .send({
        amount: "",
        type: "",
        yearsOfService: "",
      });
    console.log(result.body);
    expect(result.statusCode).toBe(400);

    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/base-salary", () => {
  beforeEach(async () => {
    await createManyTestBaseSalary();
  });

  afterEach(async () => {
    await removeAllTestBaseSalary();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/base-salary")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(2);
    expect(result.body.paging.totalItem).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/base-salary")
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

  it("should can search using type", async () => {
    const result = await supertest(web)
      .get("/api/base-salary")
      .query({
        type: "test 1",
      })
      .set("Authorization", "test");
    console.log("Base Salary search result:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });

  it("should can search using yearsOfService", async () => {
    const result = await supertest(web)
      .get("/api/base-salary")
      .query({
        yearsOfService: "1",
      })
      .set("Authorization", "test");
    console.log("Base Salary search result:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(7);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(7);
  });
});

describe("GET /api/base-salary/:baseSalaryId", () => {
  beforeEach(async () => {
    await removeAllTestBaseSalary();
    await createTestBaseSalary();
  });

  afterEach(async () => {
    await removeAllTestBaseSalary();
  });

  it("should can get base salary by id", async () => {
    const testBaseSalary = await getTestBaseSalary();
    const result = await supertest(web)
      .get("/api/base-salary/" + testBaseSalary.baseSalaryId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.baseSalaryId).toBe(testBaseSalary.baseSalaryId);
    expect(result.body.data.type).toBe("test");
    expect(result.body.data.amount).toBe(1000000);
    expect(result.body.data.yearsOfService).toBe("1");
  });

  it("should reject if token is invalid", async () => {
    const testBaseSalary = await getTestBaseSalary();
    const result = await supertest(web)
      .get("/api/base-salary/" + testBaseSalary.baseSalaryId)
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/base-salary/:baseSalaryId", () => {
  beforeEach(async () => {
    await removeAllTestBaseSalary();
    await createTestBaseSalary();
  });

  afterEach(async () => {
    await removeAllTestBaseSalary();
  });

  it("should can update base salary", async () => {
    const testBaseSalary = await getTestBaseSalary();
    const result = await supertest(web)
      .patch("/api/base-salary/" + testBaseSalary.baseSalaryId)
      .set("Authorization", "test")
      .send({
        type: "test update",
        yearsOfService: "2",
        amount: 2000000,
      });

    expect(result.status).toBe(200);
    expect(result.body.data.baseSalaryId).toBe(testBaseSalary.baseSalaryId);
    expect(result.body.data.type).toBe("test update");
    expect(result.body.data.yearsOfService).toBe("2");
    expect(result.body.data.amount).toBe(2000000);
  });

  it("should reject if request is invalid", async () => {
    const testBaseSalary = await getTestBaseSalary();
    const result = await supertest(web)
      .patch("/api/base-salary/" + testBaseSalary.baseSalaryId)
      .set("Authorization", "test")
      .send({
        type: "",
        yearsOfService: "",
        amount: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/base-salary/:baseSalaryId", () => {
  beforeEach(async () => {
    await removeAllTestBaseSalary();
    await createTestBaseSalary();
  });

  afterEach(async () => {
    await removeAllTestBaseSalary();
  });

  it("should can delete base salary", async () => {
    const testBaseSalary = await getTestBaseSalary();
    const result = await supertest(web)
      .delete("/api/base-salary/" + testBaseSalary.baseSalaryId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });
});
