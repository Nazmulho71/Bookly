const express = require("express");
const router = express.Router();
const objectId = require("../middleware/objectId");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const admin = require("../middleware/admin");
const { Review, validateReview } = require("../models/review");
const { Book } = require("../models/book");

router.get("/:id/reviews", objectId, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("Book not found.");
  res.send(book.reviews);
});

router.post(
  "/:id/reviews",
  [auth, objectId, validate(validateReview)],
  async (req, res) => {
    const id = req.params.id;

    const review = new Review({
      user: req.user._id,
      comment: req.body.comment,
      book: id,
    });

    const book = await Book.findById(id);
    if (!book) return res.status(404).send("Book not found.");
    book.reviews.push(review);
    book.save();

    res.send(review);
  }
);

router.put(
  "/:id/reviews/:reviewId",
  [auth, objectId, validate(validateReview)],
  async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Review not found.");
    const review = book.reviews.id(req.params.reviewId);
    review.comment = req.body.comment;
    await book.save();

    res.send(review);
  }
);

router.delete(
  "/:id/reviews/:reviewId",
  [auth, admin, objectId],
  async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Review not found.");
    const review = book.reviews.id(req.params.reviewId);
    review.remove();
    await book.save();

    res.send(review);
  }
);

module.exports = router;
