const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("X-Auth-Token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decode = jwt.verify(token, config.get("jwtSignatureKey"));
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
