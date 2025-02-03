const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BaseAppliance = require("./appliance.model");

// AirConditioner Schema
const airConditionerSchema = new Schema({
  temperature: { type: Number, required: true },
});

const AirConditioner = BaseAppliance.discriminator(
  "AirConditioner",
  airConditionerSchema
);
module.exports = AirConditioner;
