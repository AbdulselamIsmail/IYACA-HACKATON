const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");

// @route   GET /api/patient/available-slots
// @desc    Get slots with optional filters (Date & Sex)
router.get("/available-slots", async (req, res) => {
  try {
    const { date, sex } = req.query;

    console.log("--------------------------------");
    console.log("🔍 DEBUG LOG:");
    console.log("1. Incoming Query Params:", req.query);

    // Start with a basic query: Only show available slots
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
      // Use Regex to match "female", "Female", "FEMALE"
      const regex = new RegExp(`^${sex}$`, "i");

      // Find doctors matching the sex
      const doctors = await User.find({ role: "doctor", sex: sex });
      const doctorIds = doctors.map((doc) => doc._id);

      // Filter appointments by these Doctor IDs
      query.doctorId = { $in: doctorIds };
    }

    const slots = await Appointment.find(query).populate(
      "doctorId",
      "name sex profilePicture"
    ); // Added profilePicture here

    res.json(slots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/patient/book
// @desc    Book a specific slot
router.post("/book", async (req, res) => {
  const { slotId, patientId } = req.body;

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

    appointment.status = "booked";
    appointment.patientId = patientId;
    appointment.meetingLink = `https://meet.jit.si/hackathon_telehealth_${appointment._id}`;

    await appointment.save();

    res.json({ msg: "Booking Successful", appointment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/patient/my-appointments/:patientId
// @desc    See the appointments YOU have booked
router.get("/my-appointments/:patientId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.patientId,
    }).populate("doctorId", "name email sex profilePicture");

    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
