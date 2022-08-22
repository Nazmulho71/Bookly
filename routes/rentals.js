const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { Rental, validateRental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Book } = require("../models/book");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", [auth, validate(validateRental)], async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid book.");

  if (book.numberInStock === 0)
    return res.status(400).send("Book not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
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
      await rental.save();
      book.numberInStock--;
      book.save();
    });
    session.endSession();

    res.send(rental);
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});

module.exports = router;
