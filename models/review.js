const mongoose = require("mongoose");
const Float = require("mongoose-float").loadType(mongoose);
const Joi = require("joi-oid");

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    minLength: 5,
    maxLength: 255,
    required: true,
  },
  rating: {
    type: Float,
    min: 0,
    max: 5,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

function validateReview(review) {
  const schema = Joi.object({
    comment: Joi.string().min(5).max(255).required(),
    rating: Joi.number().min(0).max(5),
    userId: Joi.objectId(),
    bookId: Joi.objectId(),
  });

  return schema.validate(review);
}

exports.reviewSchema = reviewSchema;
exports.Review = Review;
exports.validateReview = validateReview;
