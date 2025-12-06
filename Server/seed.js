const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Appointment = require("./models/Appointment");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const importData = async () => {
  try {
    console.log("🔥 destroying old data...");
    // Clear existing data so we don't have duplicates
    await Appointment.deleteMany();
    await User.deleteMany();

    console.log("🌱 Creating Users...");

    // 1. Create a Doctor
    const doctor = await User.create({
      name: "Dr. Gregory House",
      email: "house@princeton.com",
      password: "123",
      role: "doctor",
      specialization: "Diagnostic Medicine",
    });

    // 2. Create a Patient
    const patient = await User.create({
      name: "Marty McFly",
      email: "marty@future.com",
      password: "123",
      role: "patient",
    });

    console.log(`✅ Doctor Created: ${doctor.name} (ID: ${doctor._id})`);
    console.log(`✅ Patient Created: ${patient.name} (ID: ${patient._id})`);

    console.log("🌱 Creating Slots...");

    // 3. Create Available Slots for the Doctor
    // We create a date for "Tomorrow at 10:00 AM"
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const slot1 = await Appointment.create({
      doctorId: doctor._id,
      date: tomorrow,
      status: "available",
      patientId: null,
    });

    console.log(`✅ Slot Created! (ID: ${slot1._id})`);

    console.log("-----------------------------------");
    console.log("🚀 COPY THESE IDS FOR YOUR TEST:");
    console.log(`"slotId": "${slot1._id}"`);
    console.log(`"patientId": "${patient._id}"`);
    console.log("-----------------------------------");

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
