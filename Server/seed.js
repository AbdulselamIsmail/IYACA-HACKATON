const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Appointment = require("./models/Appointment");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    console.log("🔥 Destroying old data...");
    await Appointment.deleteMany();
    await User.deleteMany();

    console.log("🌱 Creating Users...");

    // --- 1. Create 3 Doctors ---
    const doctors = await User.create([
      {
        name: "Dr. Gregory House",
        email: "house@hospital.com",
        password: "123",
        role: "doctor",
        sex: "male",
        profilePicture: "https://i.pravatar.cc/150?img=11",
      },
      {
        name: "Dr. Lisa Cuddy",
        email: "cuddy@hospital.com",
        password: "123",
        role: "doctor",
        sex: "female",
        profilePicture: "https://i.pravatar.cc/150?img=5",
      },
      {
        name: "Dr. James Wilson",
        email: "wilson@hospital.com",
        password: "123",
        role: "doctor",
        sex: "male",
        profilePicture: "https://i.pravatar.cc/150?img=8",
      },
    ]);

    // --- 2. Create 3 Patients ---
    const patients = await User.create([
      {
        name: "Marty McFly",
        email: "marty@future.com",
        password: "123",
        role: "patient",
        sex: "male",
        age: 17,
      },
      {
        name: "Sarah Connor",
        email: "sarah@skynet.com",
        password: "123",
        role: "patient",
        sex: "female",
        age: 29,
      },
      {
        name: "Tony Stark",
        email: "tony@avengers.com",
        password: "123",
        role: "patient",
        sex: "male",
        age: 45,
      },
    ]);

    console.log(
      `✅ Created ${doctors.length} Doctors and ${patients.length} Patients.`
    );
    console.log("🌱 Creating 5 Appointments per Doctor...");

    // Helper to generate a date relative to today
    const getDate = (daysAdd, hour) => {
      const d = new Date();
      d.setDate(d.getDate() + daysAdd);
      d.setHours(hour, 0, 0, 0);
      return d;
    };

    // --- 3. Loop through EACH doctor and create 5 slots ---
    // Pattern:
    // Slot 1: Today at 9 AM
    // Slot 2: Today at 2 PM
    // Slot 3: Tomorrow at 10 AM
    // Slot 4: Tomorrow at 4 PM
    // Slot 5: Day After Tomorrow at 11 AM

    const timeOffsets = [
      { days: 0, hour: 9 }, // Today Morning
      { days: 0, hour: 14 }, // Today Afternoon
      { days: 1, hour: 10 }, // Tomorrow Morning
      { days: 1, hour: 16 }, // Tomorrow Afternoon
      { days: 2, hour: 11 }, // Day After
    ];

    let totalSlots = 0;

    for (const doc of doctors) {
      for (const time of timeOffsets) {
        await Appointment.create({
          doctorId: doc._id,
          date: getDate(time.days, time.hour),
          status: "available",
        });
        totalSlots++;
      }
    }

    console.log(`✅ Successfully created ${totalSlots} Available Slots.`);
    console.log("-----------------------------------------");
    console.log("🧪 TEST DATA INFO:");
    console.log(`Doctors: ${doctors.map((d) => d.name).join(", ")}`);
    console.log(`Patients: ${patients.map((p) => p.name).join(", ")}`);
    console.log(`Dates covered: Today, Tomorrow, Day After`);
    console.log("-----------------------------------------");

    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
