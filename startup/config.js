const config = require("config");

module.exports = function () {
  if (!config.get("jwtSignatureKey")) {
    throw new Error("FATAL ERR: 'jwtSignatureKey' not defined.");
  }
};
