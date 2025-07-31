import supertest from "supertest";
import http from "http";
import { web } from "../../application/web.js";
import logger from "../../application/logging.js";
import {
  createTestUser,
  removeTestUser,
  createTestGrade,
  getTestGrade,
  createManyTestGrade,
  removeAllTestGrade,
  removeAllTestBaseSalary,
  createTestBaseSalary,
  getTestBaseSalary,
} from "../grade/test.util.js";
const server = http.createServer(web);

describe("POST /api/grade", () => {
  beforeEach(async () => {
    await removeTestUser();
    await removeAllTestBaseSalary();
    await createTestUser();
    await createTestBaseSalary();
  });
  afterEach(async () => {
    await removeAllTestBaseSalary();
    await removeAllTestGrade();
  });

  it("should create a new grade", async () => {
    const baseSalary = await getTestBaseSalary();
    const result = await supertest(server)
      .post("/api/grade")
      .set("Authorization", "test")
      .send({
        baseSalaryId: baseSalary.baseSalaryId,
        gradeName: "test",
        type: "test",
      });

    console.log(result.body);

    expect(result.statusCode).toBe(200);
    expect(result.body.data.gradeName).toBe("test");
    expect(result.body.data.type).toBe("test");
    expect(result.body.data.baseSalaryId).toBe(baseSalary.baseSalaryId);
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(server)
      .post("/api/grade")
      .set("Authorization", "test")
      .send({
        baseSalaryId: "",
        gradeName: "",
        type: "",
      });
    console.log(result.body);
    expect(result.statusCode).toBe(400);

    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/grade", () => {
  beforeEach(async () => {
    await createManyTestGrade();
  });

  afterEach(async () => {
    await removeAllTestGrade();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/grade")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(2);
    expect(result.body.paging.totalItem).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/grade")
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
      .get("/api/grade")
      .query({
        type: "test 1",
      })
      .set("Authorization", "test");
    console.log("Grade search result:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });

  it("should can search using gradeName", async () => {
    const result = await supertest(web)
      .get("/api/grade")
      .query({
        gradeName: "test 1",
      })
      .set("Authorization", "test");
    console.log("Grade search result:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });
});

describe("GET /api/grade/:gradeId", () => {
  beforeEach(async () => {
    await removeAllTestGrade();
    await createTestGrade();
  });

  afterEach(async () => {
    await removeAllTestGrade();
  });

  it("should can get grade by id", async () => {
    const testGrade = await getTestGrade();
    const result = await supertest(web)
      .get("/api/grade/" + testGrade.gradeId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.baseSalaryId).toBe(testGrade.baseSalaryId);
    expect(result.body.data.type).toBe("test");
    expect(result.body.data.amount).toBe(1000000);
    expect(result.body.data.yearsOfService).toBe("1");
  });

  it("should reject if token is invalid", async () => {
    const testGrade = await getTestGrade();
    const result = await supertest(web)
      .get("/api/grade/" + testGrade.gradeId)
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/grade/:gradeId", () => {
  beforeEach(async () => {
    await removeAllTestGrade();
    await createTestGrade();
  });

  afterEach(async () => {
    await removeAllTestGrade();
  });

  it("should can update grade", async () => {
    const testGrade = await getTestGrade();
    const result = await supertest(web)
      .patch("/api/grade/" + testGrade.gradeId)
      .set("Authorization", "test")
      .send({
        baseSalaryId: testGrade.baseSalaryId,
        gradeName: "test update",
        type: "III/c",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.gradeId).toBe(testGrade.gradeId);
    expect(result.body.data.baseSalaryId).toBe(testGrade.baseSalaryId);
    expect(result.body.data.gradeName).toBe("test update");
    expect(result.body.data.type).toBe("III/c");
  });

  it("should reject if request is invalid", async () => {
    const testGrade = await getTestGrade();
    const result = await supertest(web)
      .patch("/api/grade/" + testGrade.gradeId)
      .set("Authorization", "test")
      .send({
        gradeName: "",
        type: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /grade/:gradeId", () => {
  beforeEach(async () => {
    await removeAllTestGrade();
    await createTestGrade();
  });

  afterEach(async () => {
    await removeAllTestGrade();
  });

  it("should can delete grade", async () => {
    const testGrade = await getTestGrade();
    const result = await supertest(web)
      .delete("/api/grade/" + testGrade.gradeId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });
});
