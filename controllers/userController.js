const User = require("../models/user_schema");
const bcrypt = require("bcryptjs");

module.exports.updateProfile = async (req, res) => {
  try {
    const id = req.user._id.toHexString();
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (updatedUser) res.status(201).json({ data: updatedUser });
      else res.status(400).send({ error: "Please try again" });
    } else {
      const { mobile, username } = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, {
        username,
        mobile,
      });
      if (updatedUser) res.status(201).json({ data: updatedUser });
      else res.status(400).send({ error: "Please try again" });
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
