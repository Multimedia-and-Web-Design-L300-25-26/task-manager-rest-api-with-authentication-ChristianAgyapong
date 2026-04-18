import request from "supertest";
import app from "../src/app.js";

describe("Auth Routes", () => {

  let token;

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test@example.com");
  });

  it("should not register with missing fields", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "incomplete@example.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });

  it("should not register with duplicate email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Duplicate User",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email already in use");
  });

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  it("should not login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

  it("should not login with non-existent email", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nobody@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

});