const Joi = require("joi").extend(require("@joi/date"));
const mongoose = require("mongoose");
const { schema } = require("./category");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: {
      type: String,
      minLength: 5,
      maxLength: 255,
      required: true,
    },
    subtitle: {
      type: String,
      minLength: 5,
      maxLength: 255,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: schema,
      required: true,
    },
    price: {
      type: Number,
      min: 10,
      max: 1000,
      get: (p) => Math.floor(p),
      set: (p) => Math.floor(p),
      required: true,
    },
    author: {
      type: String,
      minLength: 5,
      maxLength: 255,
      required: true,
    },
    numberInStock: {
      type: Number,
      min: 0,
      max: 255,
      required: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    dailyRentalRate: {
      type: Number,
      min: 0,
      max: 255,
      required: true,
    },
    freeShipping: {
      type: Boolean,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      get: (r) => r.toFixed(1),
      set: (r) => r.toFixed(1),
    },
    review: {
      type: String,
      minLength: 5,
      maxLength: 255,
    },
  })
);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    subtitle: Joi.string().min(5).max(255),
    image: Joi.string().required(),
    categoryId: Joi.objectId().required(),
    price: Joi.number().min(10).max(1000).required(),
    author: Joi.string().min(5).max(255).required(),
    numberInStock: Joi.number().min(0).required(),
    publishDate: Joi.date().format("YYYY-MM-DD").utc(),
    dailyRentalRate: Joi.number().min(0).required(),
    rating: Joi.number().min(0).max(5).required(),
    review: Joi.string().min(5),
  });

  return schema.validate(book);
}

exports.Book = Book;
exports.validateBook = validateBook;
