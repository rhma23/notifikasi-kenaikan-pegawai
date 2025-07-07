import supertest from "supertest";
import http from "http";
import { web } from "../../application/web.js";
import logger from "../../application/logging.js";
import {
  removeAllTestEducation,
  createTestUser,
  removeTestUser,
  createTestEducation,
  getTestEducation,
  createManyTestEducation,
} from "../education/test.util.js";
const server = http.createServer(web);

describe("POST /api/education", () => {
  beforeEach(async () => {
    await removeTestUser();
    await createTestUser();
  });
  afterEach(async () => {
    await removeAllTestEducation();
  });

  it("should create a new education", async () => {
    const result = await supertest(server)
      .post("/api/education")
      .set("Authorization", "test")
      .send({
        level: "test",
        major: "test",
      });

    expect(result.statusCode).toBe(200);
    expect(result.body.data.level).toBe("test");
    expect(result.body.data.major).toBe("test");
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(server)
      .post("/api/education")
      .set("Authorization", "test")
      .send({
        level: "",
        major: "",
      });
    console.log(result.body);
    expect(result.statusCode).toBe(400);

    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/education", () => {
  beforeEach(async () => {
    await createManyTestEducation();
  });

  afterEach(async () => {
    await removeAllTestEducation();
  });

  it("should can search without parameter", async () => {
    const result = await supertest(web)
      .get("/api/education")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(2);
    expect(result.body.paging.totalItem).toBe(15);
  });

  it("should can search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/education")
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

  it("should can search using level", async () => {
    const result = await supertest(web)
      .get("/api/education")
      .query({
        level: "test 1",
      })
      .set("Authorization", "test");
    console.log("Education search result:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });
  it("should can search using major", async () => {
    const result = await supertest(web)
      .get("/api/education")
      .query({
        major: "test 1",
      })
      .set("Authorization", "test");
    console.log("Education search result:", result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.totalPage).toBe(1);
    expect(result.body.paging.totalItem).toBe(6);
  });
});

describe("GET /api/education/:educationId", () => {
  beforeEach(async () => {
    await removeAllTestEducation();
    await createTestEducation();
  });

  afterEach(async () => {
    await removeAllTestEducation();
  });

  it("should can get education by id", async () => {
    const testEducation = await getTestEducation();
    const result = await supertest(web)
      .get("/api/education/" + testEducation.educationId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.educationId).toBe(testEducation.educationId);
    expect(result.body.data.level).toBe("test");
    expect(result.body.data.major).toBe("test");
  });

  it("should reject if token is invalid", async () => {
    const testEducation = await getTestEducation();
    const result = await supertest(web)
      .get("/api/education/" + testEducation.educationId)
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/education/:educationId", () => {
  beforeEach(async () => {
    await removeAllTestEducation();
    await createTestEducation();
  });

  afterEach(async () => {
    await removeAllTestEducation();
  });

  it("should can update education", async () => {
    const testEducation = await getTestEducation();
    const result = await supertest(web)
      .patch("/api/education/" + testEducation.educationId)
      .set("Authorization", "test")
      .send({
        level: "test update",
        major: "test update",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.educationId).toBe(testEducation.educationId);
    expect(result.body.data.level).toBe("test update");
    expect(result.body.data.major).toBe("test update");
  });

  it("should reject if request is invalid", async () => {
    const testEducation = await getTestEducation();
    const result = await supertest(web)
      .patch("/api/education/" + testEducation.educationId)
      .set("Authorization", "test")
      .send({
        level: "",
        major: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/education/:educationId", () => {
  beforeEach(async () => {
    await removeAllTestEducation();
    await createTestEducation();
  });

  afterEach(async () => {
    await removeAllTestEducation();
  });

  it("should can delete education", async () => {
    const testEducation = await getTestEducation();
    const result = await supertest(web)
      .delete("/api/education/" + testEducation.educationId)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");
  });
});
