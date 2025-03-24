const { Home, Room, Appliance, User } = require("../models");
const { checkPermission } = require("./permissions.controller.js");

const createRoom = async (req, res) => {
  if (!req.body.room || !req.body.requester) {
    return res.status(400).json({
      success: false,
      message: "Failed to create room. Please provide all fields",
    });
  }

  const room = req.body.room;
  const requesterName = req.body.requester;

  if (!room.name || !room.type || !room.home) {
    return res.status(400).json({
      success: false,
      message: "Failed to create room. Please provide all fields",
    });
  }

  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Verify that the home exists
  const home = await Home.findById(room.home)
  if (!home) {
    return res.status(404).json({ success: false, message: "Home not found" });
  }

    // Permission check
    const validPerms = checkPermission(requester, home, "modifyHome");
    if (!validPerms) {
      return res.status(403).json({ success: false, message: "User does not have sufficient permissions" });
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

const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id)
      .populate({
        path: "appliances",
        populate: [{ path: "energyProfile" }],
      })
      .populate("energyProfile");
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    console.log("Error in fetching home:", error.message);
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

const modifyRoom = async (req, res) => {
  const { id } = req.params;
  if (!req.body.room || !req.body.requester) {
    return res.status(400).json({
      success: false,
      message: "Failed to modify room. Please provide all fields",
    });
  }

  const room = req.body.room;
  const requesterName = req.body.requester;

  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

    // Find the room to ensure it exists
    const dbRoom = await Room.findById(id);
    if (!dbRoom) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    // Query home for permssion check
    const home = await Home.findOne({ rooms: dbRoom._id });
    if (!home) {
      return res.status(404).json("Could not find home.");
    }

    // Permission check
    const validPerms = checkPermission(requester, home, "modifyHome");
    if (!validPerms) {
      return res.status(403).json({ success: false, message: "User does not have sufficient permissions" });
    }

    if(room.name) {
      dbRoom.name = room.name;
    }

    if(room.type) {
      dbRoom.type = room.type;
    }

    await dbRoom.save();
    return res.status(200).json({ success: true, message: "Room updated successfully." });
}

const deleteRoom = async (req, res) => {
  const { id } = req.params;
  if (!req.body.requester) {
    return res.status(400).json({
      success: false,
      message: "Failed to create room. Please provide all fields",
    });
  }

  const requesterName = req.body.requester;
  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  try {
    // Find the room to ensure it exists
    const room = await Room.findById(id);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    // Query home for permssion check
    const home = await Home.findOne({ rooms: room._id });
    if (!home) {
      return res.status(404).json("Could not find home.");
    }

    // Permission check
    const validPerms = checkPermission(requester, home, "modifyHome");
    if (!validPerms) {
      return res.status(403).json({ success: false, message: "User does not have sufficient permissions" });
    }

    // Delete all appliances associated with the room
    await Appliance.deleteMany({ room: id });

    // Delete the room
    await Room.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Room and associated appliances deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

module.exports = { createRoom, getRoomById, getRoomsByHome, modifyRoom, deleteRoom };
