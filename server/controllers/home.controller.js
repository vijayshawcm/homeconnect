const { Home, User, Room, Appliance } = require("../models");
const mongoose = require("mongoose");
const { checkPermission } = require("./permissions.controller.js")

const createHome = async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ "userInfo.username": username });
  const home = { name: req.body.homeName, owner: user._id };
  console.log(home);

  const newHome = new Home(home);

  try {
    await newHome.save();
    res.status(201).json({ success: true, data: newHome });
  } catch (error) {
    console.error("Error in creating home: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getHomes = async (req, res) => {
  try {
    const homes = await Home.find({});
    res.status(200).json({ success: true, data: homes });
  } catch (error) {
    console.log("Error in fetching homes:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getHomeById = async (req, res) => {
  const { id } = req.params;
  try {
    const home = await Home.findById(id)
      .populate({
        path: "rooms",
        populate: [{ path: "appliances" }, { path: "energyProfile" }],
      })
      .populate("owner")
      .populate("dwellers")
      .populate("energyProfile");
    res.status(200).json({ success: true, data: home });
  } catch (error) {
    console.log("Error in fetching home:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getHomesByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ "userInfo.username": id });
    const ownedHomes = await Home.find({ owner: user._id })
      .populate({
        path: "rooms",
        populate: [{ path: "appliances" }, { path: "energyProfile" }],
      })
      .populate("owner")
      .populate("dwellers")
      .populate("energyProfile");
    const dwelledHomes = await Home.find({ "dwellers.user": user._id })
      .populate({
        path: "rooms",
        populate: [{ path: "appliances" }, { path: "energyProfile" }],
      })
      .populate("owner")
      .populate("dwellers")
      .populate("energyProfile");
    res.status(200).json({
      success: true,
      data: {
        ownedHomes,
        dwelledHomes,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

const renameHome = async (req, res) => {
  const { id } = req.params;
  if(!req.body.requester || !req.body.name) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const requesterName = req.body.requester;
  const homeName = req.body.name;

  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({
    "userInfo.usernameLower": requesterName.toLowerCase(),
  });
  if (!requester) {
    return res.status(404).json("Requester not found.");
  }

  // Find the home to ensure it exists
  const home = await Home.findById(id);
  if (!home) {
    return res
      .status(404)
      .json({ success: false, message: "Home not found" });
  }

  const validPerms = checkPermission(requester, home, "modifyHome");
    if (!validPerms) {
      return res.status(403).json({ success: false, message: "User does not have sufficient permissions" });
    }

  await home.updateOne({ name: homeName });
  return res.status(200).json({ success: true, data: home });

}

const deleteHome = async (req, res) => {
  const { id } = req.params;
  if(!req.body.requester) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
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
    // Find the home to ensure it exists
    const home = await Home.findById(id);
    if (!home) {
      return res
        .status(404)
        .json({ success: false, message: "Home not found" });
    }

    if(!home.owner.equals(requester._id)) {
      return res.status(403).json({ success: false, message: "Houses can only be deleted by their owner."});
    }

    // Find all rooms associated with the home
    const rooms = await Room.find({ home: id });

    // Delete all appliances in each room
    for (const room of rooms) {
      const appliances = await Appliance.find({ room: room._id });
      for (const appliance of appliances) await appliance.deleteOne();
      await room.deleteOne();
    }

    // Delete the home
    await home.deleteOne();

    res.status(200).json({
      success: true,
      message: "Home, associated rooms, and appliances deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

module.exports = {
  createHome,
  getHomes,
  getHomeById,
  getHomesByUserId,
  renameHome,
  deleteHome,
};
