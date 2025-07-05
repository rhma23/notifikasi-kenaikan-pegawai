import supertest from "supertest";
import http from "http";
import { web } from "../application/web.js";
import logger from "../application/logging.js";
import {
  removeAllTestDivision,
  createTestUser,
  removeTestUser,
  createTestDivision,
  getTestDivision,
} from "./test.util.js";
const server = http.createServer(web);

describe("POST /api/division", () => {
  beforeEach(async () => {
    await removeTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await removeAllTestDivision();
  });

  it("should create a new division", async () => {
    const result = await supertest(server)
      .post("/api/division")
      .set("Authorization", "test")
      .send({
        divisionName: "test",
      });

    expect(result.statusCode).toBe(200);
    expect(result.body.data.divisionName).toBe("test");
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(server)
      .post("/api/division")
      .set("Authorization", "test")
      .send({
        divisionName: "",
      });
    console.log(result.body);
    expect(result.statusCode).toBe(400);

    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/division", () => {
  beforeEach(async () => {
    await createTestDivision();
  });

  afterEach(async () => {
    await removeAllTestDivision();
  });

  it("should can get division", async () => {
    const result = await supertest(web)
      .get("/api/division")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.divisionName).toBe("test");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/division")
      .set("Authorization", "test");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/division")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/division/:divisionId", () => {
  beforeEach(async () => {
    await removeAllTestDivision();
    await createTestDivision();
  });

  afterEach(async () => {
    await removeAllTestDivision();
  });

  it("should can get division by id", async () => {
    const testDivision = await getTestDivision();
    const result = await supertest(web)
      .get("/api/division/" + testDivision.divisionId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.divisionId).toBe(testDivision.divisionId);
    expect(result.body.data.divisionName).toBe("test");
  });

  it("should reject if token is invalid", async () => {
    const testDivision = await getTestDivision();
    const result = await supertest(web)
      .get("/api/division/" + testDivision.divisionId)
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/division/:divisionId", () => {
  beforeEach(async () => {
    await removeAllTestDivision();
    await createTestDivision();
  });

  afterEach(async () => {
    await removeAllTestDivision();
  });

  it("should can update division", async () => {
    const testDivision = await getTestDivision();
    const result = await supertest(web)
      .patch("/api/division/" + testDivision.divisionId)
      .set("Authorization", "test")
      .send({
        divisionName: "test update",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.divisionId).toBe(testDivision.divisionId);
    expect(result.body.data.divisionName).toBe("test update");
  });

  it("should reject if request is invalid", async () => {
    const testDivision = await getTestDivision();
    const result = await supertest(web)
      .patch("/api/division/" + testDivision.divisionId)
      .set("Authorization", "test")
      .send({
        divisionName: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/division/:divisionId", () => {
  beforeEach(async () => {
    await removeAllTestDivision();
    await createTestDivision();
  });

  afterEach(async () => {
    await removeAllTestDivision();
  });

  it("should can delete division", async () => {
    const testDivision = await getTestDivision();
    const result = await supertest(web)
      .delete("/api/division/" + testDivision.divisionId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });
});
