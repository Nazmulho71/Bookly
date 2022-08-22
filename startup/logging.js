require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const config = require("config");

module.exports = function () {
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: true,
      handleRejections: true,
    })
  );

  winston.add(
    new winston.transports.MongoDB({
      db: config.get("db"),
      options: { useUnifiedTopology: true },
    })
  );
};
