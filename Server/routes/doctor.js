const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User"); // <--- THIS LINE IS CRITICAL

// --- MIDDLEWARE: Check if user is actually a doctor ---
const isDoctor = (req, res, next) => {
  // req.user is populated by the 'auth' middleware
  if (req.user.role !== "doctor") {
    return res.status(403).json({ msg: "Access Denied. Doctors only." });
  }
  next();
};

// @route   POST /api/doctor/add-slot
// @desc    Doctor creates a new "Available" time slot
// @access  Protected (Doctor only)
router.post("/add-slot", auth, isDoctor, async (req, res) => {
  const { date } = req.body; // We DO NOT ask for doctorId anymore

  try {
    // We get doctorId securely from the token
    const newSlot = new Appointment({
      doctorId: req.user.id,
      date: new Date(date),
      status: "available",
    });

    await newSlot.save();

    res.json({ msg: "Slot created successfully", slot: newSlot });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ==========================================
// 1. GET DOCTOR PROFILE (NEW)
// @route   GET /api/doctor/me
// ==========================================
router.get("/me", auth, async (req, res) => {
  try {
    // Find the user by ID, exclude password
    const doctor = await User.findById(req.user.id).select("-password");

    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/doctor/my-slots
// @desc    See all slots (Booked & Available) for the logged-in doctor
// @access  Protected (Doctor only)
router.get("/my-slots", auth, isDoctor, async (req, res) => {
  try {
    // Securely find slots for THIS doctor only
    const slots = await Appointment.find({ doctorId: req.user.id })
      .populate("patientId", "name email sex age profilePicture") // Show patient details if booked
      .sort({ date: 1 }); // Earliest first

    res.json(slots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/doctor/complete-appointment/:id
// @desc    Mark an appointment as completed
// @access  Protected (Doctor only)
router.put("/complete-appointment/:id", auth, isDoctor, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // Security Check: Is this YOUR appointment?
    if (appointment.doctorId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to modify this appointment" });
    }

    appointment.status = "completed";
    await appointment.save();

    res.json({ msg: "Appointment completed", appointment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
