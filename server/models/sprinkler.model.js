const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BaseAppliance = require("./appliance.model");

// Sprinkler Schema
const sprinklerSchema = new Schema({
  waterFlowRate: { type: Number, default: 0 },
});

const Sprinkler = BaseAppliance.discriminator("Sprinkler", sprinklerSchema);
module.exports = Sprinkler;
