const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { roomRoutes, userRoutes, homeRoutes } = require("./routes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);
app.use("/api/homes", homeRoutes);

// Export the app
module.exports = app;
