const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const objectId = require("../middleware/objectId");
const validate = require("../middleware/validate");
const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", validate(validateUser), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["photo", "name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("X-Auth-Token", token)
    .send(_.pick(user, ["_id", "photo", "name", "email"]));
});

router.put(
  "/:id",
  [auth, objectId, validate(validateUser)],
  async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        photo: req.body.photo,
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
      },
      { new: true }
    ).select("-password");
    if (!user) return res.status(404).send("User not found.");

    res.send(user);
  }
);

router.delete("/:id", [auth, objectId], async (req, res) => {
  const user = await User.findByIdAndDelete().select("-password");
  if (!user) return res.status(404).send("User not found.");

  res.send(user);
});

module.exports = router;
