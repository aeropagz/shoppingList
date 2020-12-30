const request = require("supertest");
const app = require("../app");

describe("POST /user/login ", () => {
    test("User login", async () => {
      const response = await request(app)
      .post("/user/login")
      .send({
          username: "hodor@doorshop.sh",
          password: "123"
      });
      expect(response.statusCode).toBe(305);
    });
  });