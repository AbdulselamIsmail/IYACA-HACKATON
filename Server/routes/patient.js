const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware"); // <--- IMPORT MIDDLEWARE

// ==========================================
// 1. GET USER PROFILE (NEW)
// @route   GET /api/patient/me
// @desc    Get current logged in user's info
// ==========================================
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ==========================================
// 2. GET MY APPOINTMENTS (UPDATED)
// @route   GET /api/patient/appointments
// @desc    Get appointments formatted for Client Dashboard
// ==========================================
router.get("/appointments", auth, async (req, res) => {
  try {
    // 1. Find appointments for this patient
    const appointments = await Appointment.find({ patientId: req.user.id })
      .populate("doctorId", "name email sex profilePicture specialty") // Get doctor details
      .sort({ date: 1 }); // Sort by date (nearest first)

    // 2. Transform data to match Frontend expectations
    // Frontend expects: { id, dateTime, therapist: { name, profilePic... }, meetingLink }
    const formattedAppointments = appointments.map((apt) => ({
      id: apt._id,
      dateTime: apt.date, // Frontend expects 'dateTime', DB has 'date'
      status: apt.status,
      meetingLink: apt.meetingLink,
      therapist: apt.doctorId, // Frontend expects 'therapist', DB has 'doctorId'
    }));

    res.json(formattedAppointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/patient/available-slots
// @desc    Get slots with optional filters (Date & Sex)
// @access  Protected (User must be logged in)
router.get("/available-slots", auth, async (req, res) => {
  try {
    const { date, sex } = req.query;

    let query = { status: "available" };

    // --- FILTER 1: DATE ---
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.date = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    // --- FILTER 2: SEX ---
    if (sex) {
      const regex = new RegExp(`^${sex}$`, "i");
      const doctors = await User.find({ role: "doctor", sex: regex });
      const doctorIds = doctors.map((doc) => doc._id);
      query.doctorId = { $in: doctorIds };
    }

    const slots = await Appointment.find(query).populate(
      "doctorId",
      "name sex profilePicture"
    );

    res.json(slots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/patient/book
// @desc    Book a specific slot
// @access  Protected (Uses JWT to identify patient)
router.post("/book", auth, async (req, res) => {
  // We ONLY need slotId. We get patientId from the Token.
  const { slotId } = req.body;

  try {
    let appointment = await Appointment.findById(slotId);

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    if (appointment.status !== "available") {
      return res
        .status(400)
        .json({ msg: "Sorry, this slot is already booked." });
    }

    // --- CRITICAL SECURITY UPDATE ---
    // Instead of trusting req.body.patientId, we take it from the verified token
    appointment.status = "booked";
    appointment.patientId = req.user.id;
    appointment.meetingLink = `https://meet.jit.si/hackathon_telehealth_${appointment._id}`;

    await appointment.save();

    res.json({ msg: "Booking Successful", appointment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/patient/therapists
// @desc    Get all VERIFIED doctors for the directory
// @access  Public (or Protected, depending on preference)
router.get("/therapists", async (req, res) => {
  try {
    // Find users who are doctors AND are verified
    // We exclude the password field for security
    const therapists = await User.find({ role: "doctor", isVerified: true })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(therapists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/patient/my-appointments
// @desc    See the appointments YOU have booked
// @access  Protected
router.get("/my-appointments", auth, async (req, res) => {
  try {
    // We search for appointments where patientId matches the logged-in user
    const appointments = await Appointment.find({
      patientId: req.user.id,
    }).populate("doctorId", "name email sex profilePicture");

    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
