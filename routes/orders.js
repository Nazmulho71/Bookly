const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { Order, validateOrder } = require("../models/order");
const { User } = require("../models/user");
const { Book } = require("../models/book");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.find().sort("-orderDate");
  res.send(orders);
});

router.post("/", [auth, validate(validateOrder)], async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user.");

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid book.");

  if (book.numberInStock === 0) return res.status(400).send("Out of stock.");

  let order = new Order({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    book: {
      _id: book._id,
      title: book.title,
      author: book.author,
    },
  });

  try {
    const session = await mongoose.startSession();
    session.withTransaction(async () => {
      await order.save();
      book.numberInStock--;
      book.save();
    });
    session.endSession();

    res.send(order);
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});

module.exports = router;
