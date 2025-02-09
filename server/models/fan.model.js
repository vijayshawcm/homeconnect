const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BaseAppliance = require("./appliance.model");

// Fan Schema
const fanSchema = new Schema({
  currentSpeed: { type: Number, default: 0 },
  speedLevels: {
    type: Number,
    required: true,
    default: 3,
  },
});

const Fan = BaseAppliance.discriminator("Fan", fanSchema);
module.exports = Fan;
