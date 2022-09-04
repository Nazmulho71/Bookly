const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const objectId = require("../middleware/objectId");
const validate = require("../middleware/validate");
const { Book, validateBook } = require("../models/book");
const { Category } = require("../models/category");
const { Review } = require("../models/review");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find().sort("title");
  res.send(books);
});

router.get("/:id", objectId, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("Book not found.");

  res.send(book);
});

router.post("/", [auth, validate(validateBook)], async (req, res) => {
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category.");

  const book = new Book({
    title: req.body.title,
    subtitle: req.body.subtitle,
    edition: req.body.edition,
    image: req.body.image,
    category: {
      _id: category._id,
      name: category.name,
    },
    price: req.body.price,
    author: req.body.author,
    description: req.body.description,
    page: req.body.page,
    format: req.body.format,
    publisher: req.body.publisher,
    publishDate: req.body.publishDate,
    numberInStock: req.body.numberInStock,
    discountPrice: req.body.discountPrice,
    dailyRentalRate: req.body.dailyRentalRate,
    freeShipping: req.body.numberInStock >= 50,
    rating: req.body.rating,
  });
  await book.save();

  res.send(book);
});

router.put(
  "/:id",
  [auth, objectId, validate(validateBook)],
  async (req, res) => {
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send("Invalid category.");

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        subtitle: req.body.subtitle,
        edition: req.body.edition,
        image: req.body.image,
        category: {
          _id: category._id,
          name: category.name,
        },
        price: req.body.price,
        author: req.body.author,
        description: req.body.description,
        page: req.body.page,
        format: req.body.format,
        publisher: req.body.publisher,
        publishDate: req.body.publishDate,
        numberInStock: req.body.numberInStock,
        discountPrice: req.body.discountPrice,
        dailyRentalRate: req.body.dailyRentalRate,
        rating: req.body.rating,
      },
      { new: true }
    );
    if (!book) return res.status(404).send("Book not found.");

    res.send(book);
  }
);

router.delete("/:id", [auth, admin, objectId], async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) return res.status(404).send("Book not found.");

  res.send(book);
});

module.exports = router;
