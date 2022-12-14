const express = require("express");
const router = express.Router();
const objectId = require("../middleware/objectId");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");
const { Category, validateCategory } = require("../models/category");

router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name").select("name");
  res.send(categories);
});

router.get("/:id", objectId, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("Category not found.");

  res.send(category);
});

router.post("/", [auth, validate(validateCategory)], async (req, res) => {
  const category = new Category({ name: req.body.name });
  await category.save();

  res.send(category);
});

router.put(
  "/:id",
  [auth, objectId, validate(validateCategory)],
  async (req, res) => {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!category) return res.status(404).send("Category not found.");

    res.send(category);
  }
);

router.delete("/:id", [auth, objectId], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send("Category not found.");

  res.send(category);
});

module.exports = router;
