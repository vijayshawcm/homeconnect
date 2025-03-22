const {
  Room,
  Fan,
  AirConditioner,
  Light,
  Sprinkler,
  Appliance,
} = require("../models");
const mongoose = require("mongoose");

const validTypes = ["Light", "Fan", "AirConditioner", "Sprinkler"];

const getTotalTypeCurrentUsage = async (req, res) => {
  const { id, type } = req.params;

  try {
    // Validate the room ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    if (!type || !validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing appliance type",
      });
    }

    // Find all of type in the specified room
    const appliances = await Appliance.find({
      room: id,
      applianceType: type, // Filter by appliance type
    }).populate("energyProfile"); // Populate the energyProfile field

    if (!appliances || appliances.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No ${type}s found in the specified room`,
      });
    }

    // Calculate the total current usage of all lights
    const totalCurrentUsage = appliances.reduce((total, appliance) => {
      return total + (appliance.energyProfile?.currentUsage || 0);
    }, 0);

    res.status(200).json({
      success: true,
      applianceType: type,
      data: totalCurrentUsage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

const getTotalTypeWeeklyConsumption = async (req, res) => {
  const { id, type } = req.params;

  try {
    // Validate the room ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID",
      });
    }
    if (!type || !validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing appliance type",
      });
    }

    // Find all of type in the specified room
    const appliances = await Appliance.find({
      room: id,
      applianceType: type, // Filter by appliance type
    }).populate("energyProfile"); // Populate the energyProfile field

    if (!appliances || appliances.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No ${type}s found in the specified room`,
      });
    }

    // Calculate the total current usage of all lights
    const totalWeeklyUsage = appliances.reduce((total, appliance) => {
      return total + (appliance.energyProfile?.weeklyConsumption || 0);
    }, 0);

    res.status(200).json({
      success: true,
      applianceType: type,
      data: totalWeeklyUsage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

module.exports = { getTotalTypeCurrentUsage };
