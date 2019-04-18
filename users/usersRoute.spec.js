const db = require("../data/dbConfig");
const server = require("../api/server");
const request = require("supertest");

describe("users router", () => {
  describe("create a user", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("creates a user successfully", async () => {
      const res = await request(server)
        .post("/api/users/")
        .send({
          type: "company",
          name: "jtybgf",
          phone: 123,
          email: "a@utyebgfv.com",
          password: "qwerty"
        })
        .expect(201);

      expect(res.body.user.id).toEqual(1);
    });
  });

  describe("able to login", () => {
    it("returns a token when logging in", async () => {
      await db("users").truncate();

      await request(server)
        .post("/api/users/")
        .send({
          type: "company",
          name: "a",
          phone: 123,
          email: "a@a.com",
          password: "qwerty"
        })
        .expect(201);

      const res = await request(server)
        .post("/api/users/login")
        .send({ email: "a@a.com", password: "qwerty" })
        .expect(200);

      expect(res.body.token).toBeTruthy();
    });
  });
});
