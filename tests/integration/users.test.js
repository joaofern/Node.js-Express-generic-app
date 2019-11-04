const request = require("supertest");
const userModel = require("../../models/user");
let server;

describe("users", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await userModel.deleteMany({});
  });
  describe("POST /", () => {
    it("should create a new user", async () => {
      const user = new userModel({
        name: "João",
        email: "joao@mail.com",
        password: "password",
        country: "PT"
      });
      const res = await request(server)
        .post("/users")
        .send(user);
      expect(res.status).toBe(201);
    });
  });
});
