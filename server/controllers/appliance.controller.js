const {
  Room,
  Fan,
  AirConditioner,
  Light,
  Sprinkler,
  Appliance,
} = require("../models");

const createAppliance = async (req, res) => {
  const { id } = req.params;
  const appliance = req.body;

  console.log(id);

  if (!appliance.name || !appliance.applianceType) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  // Verify that the room exists
  if (!(await Room.findById(id))) {
    return res.status(404).json({ success: false, message: "Room not found" });
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

const modifyAppliance = async (req, res) => {
  const { id } = req.params;
  try {
    const appliance = await Appliance.findById(id);
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Applaince not found" });
    }

    switch (appliance.applianceType) {
      case "Fan":
        appliance.currentSpeed = req.body.currentSpeed;
      case "Light":
        appliance.status = "on";
      case "disabled":
        return res
          .status(500)
          .json({ success: false, message: "Appliance is disabled." });
    }
    await appliance.save();
    res.status(201).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in toggling appliance: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const toggleAppliance = async (req, res) => {
  const { id } = req.params;
  try {
    const appliance = await Appliance.findById(id);
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Applaince not found" });
    }

    switch (appliance.status) {
      case "on":
        appliance.status = "off";
        break;
      case "off":
        appliance.status = "on";
      case "disabled":
        return res
          .status(500)
          .json({ success: false, message: "Appliance is disabled." });
    }
    await appliance.save();
    res.status(201).json({ success: true, data: appliance });
  } catch (error) {
    console.error("Error in toggling appliance: ", error.message);
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
        .json({ success: false, message: "Applaince not found" });
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

const deleteAppliance = async (req, res) => {
  const { id } = req.params;
  try {
    const appliance = await Appliance.findByIdAndDelete(id);
    if (!appliance) {
      return res
        .status(404)
        .json({ success: false, message: "Applaince not found" });
    }
    res.status(200).json({ success: true, message: "Appliance Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.log(error.message);
  }
};

module.exports = {
  createAppliance,
  getAppliancesByRoom,
  toggleAppliance,
  disableAppliance,
  deleteAppliance,
};
