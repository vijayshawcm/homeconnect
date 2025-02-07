const {
  Home,
  Room,
  Fan,
  AirConditioning,
  Light,
  Sprinkler,
} = require("../models");

const createRoom = async (req, res) => {
  const room = req.body;

  if (!room.name || !room.type || !room.home) {
    return res.status(400).json({
      success: false,
      message: "Failed to create room. Please provide all fields",
    });
  }

  // Verify that the home exists
  if (!Home.findById(room.home)) {
    return res.status(404).json({ success: false, message: "Home not found" });
  }

  const newRoom = new Room(room);

  try {
    await newRoom.save();
    const updatedHome = await Home.findByIdAndUpdate(
      room.home,
      // Pushes the new order onto the current order list
      { $push: { rooms: newRoom } },
      // Returns the newly updated object
      { new: true }
    );
    res.status(201).json({ success: true, data: updatedHome });
  } catch (error) {
    console.error("Error in creating room: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {createRoom};
