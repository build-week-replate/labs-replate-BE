const db = require("../data/dbConfig");
const server = require("../api/server");
const request = require("supertest");

describe("schedules", () => {
  beforeEach(async () => {
    await db("schedules").truncate();
    await db("locations").truncate();
    await db("users").truncate();
  });

  it("should return an array of schedules", async () => {
    const user = await request(server)
      .post("/api/users/")
      .send({
        type: "company",
        name: "jtybgf",
        phone: 123,
        email: "a@utyebgfv.com",
        password: "qwerty"
      })
      .expect(201);

    const schedule = await request(server)
      .get("/api/schedules")
      .set("Authorization", user.body.token)
      .expect(200);

    expect(Array.isArray(schedule.body)).toBe(true);
  });

  it("should create successfully a schedule", async () => {
    const user = await request(server)
      .post("/api/users/")
      .send({
        type: "company",
        name: "jtybgf",
        phone: 123,
        email: "a@utyebgfv.com",
        password: "qwerty"
      })
      .expect(201);

    const schedule = await request(server)
      .post("/api/schedules")
      .set("Authorization", user.body.token)
      .send({
        pickup_name: "string",
        pickup_date: "string",
        pickup_time: "string",
        pickup_comment: "string",
        pickup_additional_comment: "string", // optional
        location_id: 1
      })
      .expect(201);

    const [id] = schedule.body;

    expect(id).toEqual(1);
  });
});
