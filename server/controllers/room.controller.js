const { Home, Room, Appliance } = require("../models");

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
      // Pushes the new room onto the current room list
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

const getRoomsByHome = async (req, res) => {
  const { id } = req.params;
  try {
    // Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).
    // https://mongoosejs.com/docs/populate.html
    const home = await Home.findById(id).populate("rooms");
    if (!home) {
      return res
        .status(404)
        .json({ success: false, message: "Home not found" });
    }
    return res.status(200).json({ success: true, data: home.rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    res.status(200).json({ success: true, message: "Room Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

module.exports = { createRoom, getRoomsByHome, deleteRoom };
