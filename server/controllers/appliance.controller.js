const { Room, Fan, AirConditioning, Light, Sprinkler } = require("./models");

const createAppliance = async (req, res) => {
  const appliance = req.body;

  if (!appliance.name || !appliance.room) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
};



module.exports = {createAppliance}