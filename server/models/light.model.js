const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BaseAppliance = require("./appliance.model");

// Light Schema
const lightSchema = new Schema({
  colorTemperature: {
    type: String,
    enum: ["warm", "neutral", "cool"],
    default: "warm",
  },
  brightness: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
});
 
const Light = BaseAppliance.discriminator("Light", lightSchema);
module.exports = Light;
