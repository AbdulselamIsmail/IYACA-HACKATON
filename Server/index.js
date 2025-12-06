const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patient");

// Import Models (optional to keep here, but good for testing)
const User = require("./models/User");
const Appointment = require("./models/Appointment");

// 1. Load env vars
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. Middleware to accept JSON data
app.use(express.json());

// 4. Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);

// Test Route
app.get("/test-models", async (req, res) => {
  res.send("Models are loaded!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
