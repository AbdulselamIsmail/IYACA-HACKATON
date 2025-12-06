const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // This connects to your cloud database
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure so you know immediately if it fails
    process.exit(1);
  }
};

module.exports = connectDB;
