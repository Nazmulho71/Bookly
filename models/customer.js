const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      minLength: 5,
      maxLength: 50,
      required: true,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return v && v.length === 10;
        },
        message: "Phone number must be 10 digits.",
      },
      required: true,
    },
    isRegular: {
      type: Boolean,
      default: false,
    },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().length(10).required(),
    isRegular: Joi.boolean(),
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
