const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to the User model
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // Null means "Open for booking"
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked", "completed"],
    default: "available",
  },
  meetingLink: {
    type: String, // We will generate this when the appointment is booked
    default: "",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
