const db = require("../data/testDbConfig");
const server = require("../api/server");
const Users = require("./usersModal");
const request = require("supertest");

describe("users router", () => {
  describe("create a user", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("creates a user successfully", async () => {
      //   await knexCleaner.clean(db);
      await db("users").truncate();

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

      console.log(res.body.user.id);

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

      console.log(res.body);

      expect(res.body.token).toBeTruthy();
    });
  });
});
