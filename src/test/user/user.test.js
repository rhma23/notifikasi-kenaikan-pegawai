import supertest from "supertest";
import http from "http";
import { web } from "../../application/web.js";
import logger from "../../application/logging.js";
import { removeTestUser, createTestUser, getTestUser } from "./test.util.js";
import bcrypt from "bcrypt";
const server = http.createServer(web);

describe("POST /api/users/create", () => {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should create a new user", async () => {
    const result = await supertest(server).post("/api/users/create").send({
      username: "test",
      password: "rahasia",
      email: "test@gmail.com",
      phoneNumber: "08978678125",
      role: "admin",
    });

    expect(result.statusCode).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phoneNumber).toBe("08978678125");
    expect(result.body.data.role).toBe("admin");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request is invalid", async () => {
    const result = await supertest(server).post("/api/users/create").send({
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "",
    });
    console.log(result.body);
    expect(result.statusCode).toBe(400);

    expect(result.body.errors).toBeDefined;
  });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login", async () => {
    const result = await supertest(server).post("/api/users/login").send({
      username: "test",
      password: "rahasia",
    });

    logger.info(result.body);

    expect(result.statusCode).toBe(200);

    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("should reject login if request is invalid", async () => {
    const result = await supertest(server).post("/api/users/login").send({
      username: "",
      password: "",
    });

    expect(result.statusCode).toBe(400);
  });

  it("should reject if password is wrong", async () => {
    const result = await supertest(server).post("/api/users/login").send({
      username: "test",
      password: "salah",
    });

    expect(result.statusCode).toBe(401);
    expect(result.body.errors).toBeDefined;
  });

  it("should reject if username is wrong", async () => {
    const result = await supertest(server).post("/api/users/login").send({
      username: "salah",
      password: "salah",
    });

    expect(result.statusCode).toBe(401);
    expect(result.body.errors).toBeDefined;
  });
});

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phoneNumber).toBe("08978974515");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update user", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        username: "Yon",
        password: "rahasialagi",
        email: "yonarifin@gmail.com",
        phoneNumber: "08976876789",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("yonarifin@gmail.com");
    expect(result.body.data.phoneNumber).toBe("08976876789");

    const user = await getTestUser();
    expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
  });

  it("should can update user email", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        email: "yonarifin@gamail.com",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("yonarifin@gamail.com");
  });

  it("should can update user phone number", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        phoneNumber: "089667809997",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.phoneNumber).toBe("089667809997");
  });

  it("should can update user role", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        role: "director",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.role).toBe("director");
  });

  it("should can update user password", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "test")
      .send({
        password: "rahasialagi",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.phoneNumber).toBe("08978974515");
    expect(result.body.data.role).toBe("admin");

    const user = await getTestUser();
    expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
  });

  it("should reject if request is not valid", async () => {
    const result = await supertest(web)
      .patch("/api/users/current")
      .set("Authorization", "salah")
      .send({});

    expect(result.status).toBe(401);
  });
});

describe("DELETE /api/users/logout", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can logout", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("ok");

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });

  it("should should reject if token is invalid", async () => {
    const result = await supertest(web)
      .delete("/api/users/logout")
      .set("Authorization", "salah");

    expect(result.status).toBe(401);
  });
});
