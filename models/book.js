const mongoose = require("mongoose");
const Float = require("mongoose-float").loadType(mongoose);
const Joi = require("joi-oid");
const { categorySchema } = require("./category");
const { reviewSchema } = require("./review");

const bookSchema = new mongoose.Schema({
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
    type: categorySchema,
    required: true,
  },
  price: {
    type: Float,
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
    maxLength: 10000,
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
    type: Float,
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
    type: Float,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [reviewSchema],
});

const Book = mongoose.model("Book", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    subtitle: Joi.string().min(5).max(255),
    edition: Joi.string().min(5).max(255),
    image: Joi.string().required(),
    categoryId: Joi.objectId(),
    price: Joi.number().min(10).max(1000).required(),
    author: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).max(10000).required(),
    page: Joi.number().min(5).max(1000).required(),
    format: Joi.string().min(5).max(255).required(),
    publisher: Joi.string().min(5).max(255).required(),
    numberInStock: Joi.number().min(0).required(),
    discountPrice: Joi.number(),
    dailyRentalRate: Joi.number().min(0).required(),
    rating: Joi.number().min(0).max(5),
  });

  return schema.validate(book);
}

exports.Book = Book;
exports.validateBook = validateBook;
