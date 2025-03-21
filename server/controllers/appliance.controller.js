const { checkPermission } = require('./permissions.controller.js');

const {
  Room,
  Fan,
  AirConditioner,
  Light,
  Sprinkler,
  Appliance,
  Home,
  User,
} = require("../models");

const createAppliance = async (req, res) => {
  const { id } = req.params;
  const requesterName = req.body.requester;
  const appliance = req.body.appliance;

  if (!requesterName || !appliance.name || !appliance.applianceType) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({ 'userInfo.usernameLower': requesterName.toLowerCase() });
  if(!requester) {
      return res.status(404).json("Requester not found.");
  }

  // Prevent duplicate names
  if ((await Appliance.findOne({ name: appliance.name }))) {
    return res.status(409).json({ success: false, message: "Duplicate appliance name" });
  }

  // Verify that the room exists
  if (!(await Room.findById(id))) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }

  // Query database for home to check user permissions
  const home = await Home.findOne({ rooms: id });
  if(!home) {
      return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "addRemoveAppliance");
  if(!validPerms) {
      return res.status(403).json("User does not have sufficient permissions");
  }

  // Add room ID to appliance object
  appliance.room = id;

  let newAppliance;
  switch (appliance.applianceType) {
    case "Fan":
      newAppliance = new Fan(appliance);
      break;
    case "Light":
      newAppliance = new Light(appliance);
      break;
    case "AirConditioner":
      newAppliance = new AirConditioner(appliance);
      break;
    case "Sprinkler":
      newAppliance = new Sprinkler(appliance);
      break;
  }
  try {
    await newAppliance.save();
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      // Pushes the new appliances onto the appliance list
      { $push: { appliances: newAppliance } },
      { new: true }
    );
    res.status(201).json({ success: true, data: updatedRoom });
  } catch (error) {
    console.error("Error in creating appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const removeAppliance = async (req, res) => {
  const { id } = req.params;
  const requesterName = req.body.requester;

  if (!requesterName) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({ 'userInfo.usernameLower': requesterName.toLowerCase() });
  if(!requester) {
      return res.status(404).json("Requester not found.");
  }

  // Query database for home and room to check user permissions
  const room = await Room.findOne({ appliances: id });
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if(!home) {
      return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "addRemoveAppliance");
  if(!validPerms) {
      return res.status(403).json("User does not have sufficient permissions");
  }

  // Delete appliance
  await room.updateOne({
    $pull: {
      appliances: id
    }
  })
  
  res.status(200).json({ success: true, data: room});
};

const renameAppliance = async (req, res) => {
  const { id } = req.params;

  if (!req.body.requester || !req.body.appliance.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const requesterName = req.body.requester;
  const applianceName = req.body.appliance.name;


  // Attempt to query database for user that is sending the request
  const requester = await User.findOne({ 'userInfo.usernameLower': requesterName.toLowerCase() });
  if(!requester) {
      return res.status(404).json("Requester not found.");
  }

  // Prevent duplicate names
  if ((await Appliance.findOne({ name: applianceName }))) {
    return res.status(409).json({ success: false, message: "Duplicate appliance name" });
  }

  // Query database for home and room to check user permissions
  const room = await Room.findOne({ appliances: id });
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  const home = await Home.findOne({ rooms: room._id });
  if(!home) {
      return res.status(404).json("Could not find home.");
  }

  // Permission check
  const validPerms = checkPermission(requester, home, "addRemoveAppliance");
  if(!validPerms) {
      return res.status(403).json("User does not have sufficient permissions");
  }

  // Delete appliance
  const appliance = await Appliance.findByIdAndUpdate(id, { name: applianceName });
  
  res.status(200).json({ success: true, data: appliance });
};

const modifyAppliance = async (req, res) => {
  const { id } = req.params;
  try {
    const appliance = await Appliance.findById(id);
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Appliance not found" });
    }

    if (appliance.status === "disabled") {
      return res
        .status(400)
        .json({ success: false, message: "Appliance is disabled." });
    }

    // Update common fields
    if (req.body.name) appliance.name = req.body.name;
    if (req.body.status) appliance.status = req.body.status;

    // Update appliance-specific fields
    switch (appliance.applianceType) {
      case "Fan":
        if (req.body.currentSpeed !== undefined) {
          appliance.currentSpeed = req.body.currentSpeed;
        }
        if (req.body.speedLevels !== undefined) {
          appliance.speedLevels = req.body.speedLevels;
        }
        break;

      case "Light":
        if (req.body.colorTemperature !== undefined) {
          appliance.colorTemperature = req.body.colorTemperature;
        }
        if (req.body.brightness !== undefined) {
          appliance.brightness = req.body.brightness;
        }
        break;

      case "AirConditioner":
        if (req.body.temperature !== undefined) {
          appliance.temperature = req.body.temperature;
        }
        if (req.body.swing !== undefined) {
          appliance.swing = req.body.swing;
        }
        if (req.body.mode !== undefined) {
          appliance.mode = req.body.mode;
        }
        break;

      case "Sprinkler":
        if (req.body.waterFlowRate !== undefined) {
          appliance.waterFlowRate = req.body.waterFlowRate;
        }
        break;

      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid appliance type." });
    }

    await appliance.save();
    res.status(200).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in modifying appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const turnOnAppliance = async (req, res) => {
  const { id } = req.params;
  try {
    const appliance = await Appliance.findById(id);
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Appliance not found" });
    }

    if (appliance.status === "disabled") {
      return res.status(400).json({
        success: false,
        message: "Appliance is disabled and cannot be turned on.",
      });
    }

    if (appliance.status === "off") {
      // Home I/O Appliance logic
      const response = await fetch(appliance.interface[0], {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

      if(response.ok) {
        appliance.status = "on";
        await appliance.save();
      } else {
        return res.status(500).json({ success: false, message: "Home I/O has encountered an error." });
      }
    }

    res.status(200).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in turning on appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const turnOffAppliance = async (req, res) => {
  const { id } = req.params;
  try {
    const appliance = await Appliance.findById(id);
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Appliance not found" });
    }

    if (appliance.status === "disabled") {
      return res.status(400).json({
        success: false,
        message: "Appliance is disabled and cannot be turned off.",
      });
    }

    if (appliance.status === "on") {
      // Home I/O Appliance logic
      const response = await fetch(appliance.interface[1], {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});

      if(response.ok) {
        appliance.status = "off";
        await appliance.save();
      } else {
        return res.status(500).json({ success: false, message: "Home I/O has encountered an error." });
      }
    }

    res.status(200).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in turning on appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const disableAppliance = async (req, res) => {
  const { id } = req.params;
  try {
    const appliance = await Appliance.findById(id);
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Appliance not found" });
    }

    appliance.status = "disabled";
    await appliance.save();
    res.status(201).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in disabling appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getAppliancesByRoom = async (req, res) => {
  const { id } = req.params;
  try {
    // Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).
    // https://mongoosejs.com/docs/populate.html
    const room = await Room.findById(id).populate("appliances");
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Home not found" });
    }
    return res.status(200).json({ success: true, appliances: room.appliances });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

module.exports = {
  createAppliance,
  removeAppliance,
  renameAppliance,
  getAppliancesByRoom,
  turnOnAppliance,
  turnOffAppliance,
  modifyAppliance,
  disableAppliance,
};
