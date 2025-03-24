const Room = require("../models/room.model");
const Home = require("../models/home.model");
const Appliance = require("../models/appliance.model");

const updateHomeEnergyProfile = async (homeId) => {
  try {
    // Find all rooms in the home and populate their energyProfile
    const rooms = await Room.find({ home: homeId }).populate("energyProfile");

    // Calculate the total current usage for the home
    let totalCurrentUsage = 0;
    rooms.forEach((room) => {
      if (room.energyProfile && room.energyProfile.currentUsage) {
        totalCurrentUsage += room.energyProfile.currentUsage;
      }
    });

    // Find the home and update its energyProfile
    const home = await Home.findById(homeId).populate("energyProfile");
    if (home && home.energyProfile) {
      home.energyProfile.currentUsage = totalCurrentUsage;
      await home.energyProfile.save(); // Save the updated energyProfile
    }
  } catch (error) {
    console.error("Error updating home energy profile:", error.message);
    throw error;
  }
};

const updateRoomEnergyProfile = async (roomId) => {
  try {
    // Find all appliances in the room and populate their energyProfile
    const appliances = await Appliance.find({ room: roomId }).populate(
      "energyProfile"
    );

    // Calculate the total current usage for the room
    let totalCurrentUsage = 0;
    appliances.forEach((appliance) => {
      if (appliance.energyProfile && appliance.energyProfile.currentUsage) {
        totalCurrentUsage += appliance.energyProfile.currentUsage;
      }
    });

    // Find the room and update its energyProfile
    const room = await Room.findById(roomId).populate("energyProfile");
    if (room && room.energyProfile) {
      room.energyProfile.currentUsage = totalCurrentUsage;
      await room.energyProfile.save(); // Save the updated energyProfile
    }
    await room.energyProfile.save();
    await room.save();
  } catch (error) {
    console.error("Error updating room energy profile:", error.message);
    throw error;
  }
};

module.exports = {
  updateHomeEnergyProfile,
  updateRoomEnergyProfile,
};
