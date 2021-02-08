const request = require("supertest");
import { app } from "../../app";
import { initDb } from "../../db/index";

beforeAll(async () => {
  await initDb();
});

describe("create Account", () => {
  test("should create a new User", async () => {
    const res = await request(app).post("/user/register/customer").send({
      email: "klaas.pelzer@gmx.de",
      name: "testUser",
      password: "123456",
      password2: "123456",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
  });
});
