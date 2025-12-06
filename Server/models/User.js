const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["doctor", "patient"],
    default: "patient",
  },
  // --- NEW FIELDS ---
  sex: {
    type: String,
    enum: ["male", "female"], // You can remove this array if you want it open-ended
    required: true, // Force them to select one
  },
  profilePicture: {
    type: String, // We will store a URL string here (not the actual image file)
    default: "https://via.placeholder.com/150", // A default gray image if they don't have one
  },
  age: {
    type: Number,
    // validation: Only required if role is patient? For a hackathon, keep it simple:
    required: false,
  },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
