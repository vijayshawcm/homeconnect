const { Home, User, Room, Appliance } = require("../models");
const mongoose = require("mongoose");

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
        populate: {
          path: "appliances",
          populate: { path: "energyProfile" }, // Ensure energyProfile inside appliances is populated
        },
      })
      .populate({
        path: "rooms",
        populate: { path: "energyProfile" }, // Populate energyProfile inside rooms
      })
      .populate("owner")
      .populate("dwellers")
      .populate("energyProfile");
    const dwelledHomes = await Home.find({ "dwellers.user": user._id })
      .populate({
        path: "rooms",
        populate: {
          path: "appliances",
          populate: { path: "energyProfile" }, // Ensure energyProfile inside appliances is populated
        },
      })
      .populate({
        path: "rooms",
        populate: { path: "energyProfile" }, // Populate energyProfile inside rooms
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

const addDweller = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the home
    const home = await Home.findById(id).populate("dwellers.user");

    if (!home) {
      return res
        .status(404)
        .json({ success: false, message: "Home not found" });
    }

    // Check if user is already a dweller
    const isAlreadyDweller = home.dwellers.some(
      (dweller) => dweller.user._id.toString() === userId
    );

    if (isAlreadyDweller) {
      return res.status(400).json({
        success: false,
        message: "User is already a dweller of this home",
      });
    }

    // Add the new dweller
    home.dwellers.push({ user: userId });
    await home.save();

    res.status(200).json({ success: true, data: home });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteHome = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the home to ensure it exists
    const home = await Home.findById(id);
    if (!home) {
      return res
        .status(404)
        .json({ success: false, message: "Home not found" });
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
  addDweller,
  deleteHome,
};
