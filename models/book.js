const Joi = require("joi-oid");
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
      required: true,
    },
    edition: {
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
      max: 255,
      required: true,
    },
    author: {
      type: String,
      minLength: 5,
      maxLength: 255,
      required: true,
    },
    description: {
      type: String,
      minLength: 5,
      maxLength: 255,
      required: true,
    },
    page: {
      type: Number,
      min: 10,
      max: 1000,
      required: true,
    },
    format: {
      type: String,
      minLength: 5,
      maxLength: 255,
      required: true,
    },
    publisher: {
      type: String,
      minLength: 0,
      maxLength: 255,
      required: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    numberInStock: {
      type: Number,
      min: 0,
      max: 255,
      required: true,
    },
    discountPrice: {
      type: Number,
      min: 10,
      max: 255,
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
    subtitle: Joi.string().min(5).max(255).required(),
    edition: Joi.string().min(5).max(255),
    image: Joi.string().required(),
    categoryId: Joi.objectId(),
    price: Joi.number().min(10).max(1000).required(),
    author: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).max(255).required(),
    page: Joi.number().min(5).max(1000).required(),
    format: Joi.string().min(5).max(255).required(),
    publisher: Joi.string().min(5).max(255).required(),
    numberInStock: Joi.number().min(0).required(),
    discount: Joi.number(),
    dailyRentalRate: Joi.number().min(0).required(),
    rating: Joi.number().min(0).max(5).required(),
    review: Joi.string().min(5),
  });

  return schema.validate(book);
}

exports.Book = Book;
exports.validateBook = validateBook;
