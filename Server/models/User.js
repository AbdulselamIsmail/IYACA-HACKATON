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
    enum: ["doctor", "patient"], // Only allow these two values
    default: "patient",
  },
  // Specific to doctors (optional for patients)
  specialization: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
