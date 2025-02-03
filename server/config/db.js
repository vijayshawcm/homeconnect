const mongoose = require("mongoose");

// Environment variables
const MONGODB_URI = process.env.MONGODB_URI;
// Connection to database
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
