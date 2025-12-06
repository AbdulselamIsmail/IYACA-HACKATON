const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure you have models/User.js

router.post("/register", async (req, res) => {
  try {
    // 1. UPDATE THIS LINE: Add sex, age, profilePicture to the extraction
    const { name, email, password, role, sex, age, profilePicture } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 2. UPDATE THIS BLOCK: Pass the new fields to the new user
    user = new User({
      name,
      email,
      password,
      role,
      sex, // <--- New
      age, // <--- New
      profilePicture, // <--- New
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
