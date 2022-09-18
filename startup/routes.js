const express = require("express");
const cors = require("cors");
const books = require("../routes/books");
const categories = require("../routes/categories");
const reviews = require("../routes/reviews");
const orders = require("../routes/orders");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/books", books);
  app.use("/api/categories", categories);
  app.use("/api/books", reviews);
  app.use("/api/orders", orders);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
