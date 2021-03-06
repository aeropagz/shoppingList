const request = require("supertest");
import { app } from "../../app";
import { initDb, db } from "../../db/index";

beforeAll(async () => {
  await initDb("test", "testUser", "testPass");
});
afterAll(() => {
  db.stop();
});

describe("create Account", () => {
  test("should create a new User", async () => {
    const res = await request(app).post("/user/register/customer").send({
      email: "klaas.pelzer@student.fh-kiel.de",
      name: "testUser",
      password: "123456",
      password2: "123456",
    });
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
  });
});
