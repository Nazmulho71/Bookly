const moment = require("moment");
const Joi = require("joi");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
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
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
        required: true,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

rentalSchema.statics.lookup = function (customerId, bookId) {
  return this.findOne({ "customer._id": customerId, "book._id": bookId });
};

rentalSchema.methods.return = function () {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, "days");
  this.rentalFee = rentalDays * this.book.dailyRentalRate;
};

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    bookId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validateRental = validateRental;
