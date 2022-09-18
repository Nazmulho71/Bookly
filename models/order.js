const mongoose = require("mongoose");
const Joi = require("joi-oid");

const orderSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true,
      },
      email: {
        type: String,
        minLength: 5,
        maxLength: 255,
        unique: true,
        required: true,
      },
    }),
    required: true,
  },
  book: {
    type: new mongoose.Schema({
      title: {
        type: String,
        minlength: 5,
        maxLength: 255,
        trim: true,
        required: true,
      },
      author: {
        type: String,
        minLength: 5,
        maxLength: 255,
        required: true,
      },
    }),
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    userId: Joi.objectId(),
    bookId: Joi.objectId(),
  });

  return schema.validate(order);
}

exports.Order = Order;
exports.validateOrder = validateOrder;
