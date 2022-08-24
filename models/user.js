const config = require("config");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi-oid");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 255,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 1024,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, admin: this.admin },
    config.get("jwtSignatureKey")
  );
};

const User = mongoose.model("User", userSchema);

const complexityOptions = {
  min: 10,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: passwordComplexity(complexityOptions),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
exports.options = complexityOptions;
