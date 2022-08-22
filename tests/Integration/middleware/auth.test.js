const request = require("supertest");
const { Category } = require("../../../models/category");
const { User } = require("../../../models/user");

describe("auth middleware", () => {
  let server;
  let token;

  beforeEach(() => {
    server = require("../../../index");
    token = new User().generateAuthToken();
  });

  afterEach(async () => {
    await server.close();
    await Category.deleteMany({});
  });

  const exec = () => {
    return request(server)
      .post("/api/categories")
      .set("X-Auth-Token", token)
      .send({ name: "category1" });
  };

  it("should return 401 if the user is not logged in", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if the token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if the token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
