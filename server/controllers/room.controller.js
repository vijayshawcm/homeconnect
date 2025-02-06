const { Room, Fan, AirConditioning, Light, Sprinkler } = require("../models");

const createRoom = async (req, res) => {
  const room = req.body;

  if (!room.name || !room.type) {
    return res.status(400).json({
      success: false,
      message: "Failed to create room. Please provide all fields",
    });
  }

  const newRoom = new Room(room);

  try {
    await newRoom.save();
    res.status(201).json({ success: true, data: newRoom });
  } catch (error) {
    console.error("Error in creating room: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  createRoom,
};
