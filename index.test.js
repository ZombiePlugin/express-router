const request = require("supertest");
const app = require("./src/app");
const { syncSeed } = require("./seed");

beforeAll(() => {
  syncSeed();
});

describe("Users api", () => {
  test("Verify the GET method doesn't error", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
  });
  test("Verify the GET method returns an array of users", async () => {
    const response = await request(app).get("/users");
    expect((response) => {
      response.body[0].name = "User 1";
      response.body[1].name = "User 2";
      response.body[2].name = "User 3";
      response.body[2].name = "User 4";
      response.body.toHaveLength(4);
    });
  });
  test("Verify the GET id method returns the correct data", async () => {
    const response = await request(app).get("/users/:id").send("1");
    expect((response) => {
      response.body.name = "User 1";
    });
  });
  test("Verify the POST method returns the correct data", async () => {
    const response = await request(app).post("/users").send({
      name: "Timothy",
      age: 19,
    });
    expect((response) => {
      response.body[4].name = "Timothy";
    });
  });
  test("Verify the PUT method updates the database", async () => {
    const response = await request(app).put("/users/5").send({
      name: "user 5",
      age: 21,
    });
    expect((response) => {
      response.body.name = "user 5";
    });
  });
  test("Verify the DELETE method deletes the object", async () => {
    const response = await request(app).delete("/users/5");
    expect((response) => {
      response.body.name = "user 5";
    });
  });
});
