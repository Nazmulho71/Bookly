const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const moderator = require("../middleware/moderator");
const objectId = require("../middleware/objectId");
const validate = require("../middleware/validate");
const { Customer, validateCustomer } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", objectId, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Customer not found.");

  res.send(customer);
});

router.post("/", [auth, validate(validateCustomer)], async (req, res) => {
  const customer = new Customer(
    _.pick(req.body, ["name", "phone", "isRegular"])
  );
  await customer.save();

  res.send(customer);
});

router.put(
  "/:id",
  [auth, admin, moderator, objectId, validate(validateCustomer)],
  async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      _.pick(req.body, ["name", "phone", "isRegular"]),
      { new: true }
    );
    if (!customer) return res.status(404).send("Customer not found.");

    res.send(customer);
  }
);

router.delete("/:id", [auth, admin, objectId], async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send("Customer not found.");

  res.send(customer);
});

module.exports = router;
