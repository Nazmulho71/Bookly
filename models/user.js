const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi-oid");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  profilePic: {
    type: String,
    default: "",
  },
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
  min: 5,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

function validateUser(user) {
  const schema = Joi.object({
    profilePic: Joi.string(),
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: passwordComplexity(complexityOptions),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
exports.options = complexityOptions;
