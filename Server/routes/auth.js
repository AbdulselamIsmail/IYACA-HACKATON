const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure you have models/User.js

// @route   POST /api/auth/register
// @desc    Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role, // 'doctor' or 'patient'
      specialization,
    });

    await user.save();

    res
      .status(201)
      .json({ msg: "User registered successfully", userId: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
