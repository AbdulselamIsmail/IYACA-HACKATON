const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware"); // <--- IMPORT MIDDLEWARE

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
