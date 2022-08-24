const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("generateAuthToken", () => {
  it("should return a JWT token", () => {
    const payload = {
      _id: mongoose.Types.ObjectId(),
      admin: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decode = jwt.verify(token, config.get("jwtSignatureKey"));

    expect(decode).toMatchObject(payload);
  });
});
