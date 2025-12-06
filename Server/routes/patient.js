const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const User = require("../models/User");

// @route   GET /api/patient/available-slots
// @desc    Get ALL slots that are open for booking
router.get("/available-slots", async (req, res) => {
  try {
    // Find all appointments where status is "available"
    // .populate('doctorId', 'name specialization') replaces the ID with actual doctor details
    const slots = await Appointment.find({ status: "available" }).populate(
      "doctorId",
      "name specialization"
    );

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
    // 1. Find the appointment by ID
    let appointment = await Appointment.findById(slotId);

    // 2. Safety Check: Does it exist?
    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // 3. Security Check: Is it already booked?
    // This prevents a "Race Condition" if two users click book at the same time
    if (appointment.status !== "available") {
      return res
        .status(400)
        .json({ msg: "Sorry, this slot is already booked." });
    }

    // 4. Update the Appointment
    appointment.status = "booked";
    appointment.patientId = patientId;

    // 5. Generate the Unique Video Room Link
    // We create a predictable room name based on the ID
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
    }).populate("doctorId", "name email"); // Show doctor info to the patient

    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
