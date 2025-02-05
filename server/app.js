const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const roomRoutes = require("./routes/room.routes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("HomeConnect Backend is running!");
});

// Export the app
module.exports = app;
