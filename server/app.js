const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const {
  userAuthRoutes,
  applianceRoutes,
  homeRoutes,
  roomRoutes,
} = require("./routes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/server/auth", userAuthRoutes);
app.use("/server/appliances", applianceRoutes);
app.use("/server/rooms", roomRoutes);
app.use("/server/homes", homeRoutes);

// Export the app
module.exports = app;
