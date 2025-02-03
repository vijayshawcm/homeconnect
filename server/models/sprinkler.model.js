const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BaseAppliance = require("./appliance.model");

// Sprinkler Schema
const sprinklerSchema = new mongoose.Schema({
  waterFlowRate: { type: Number, required: true },
});

const Sprinkler = BaseAppliance.discriminator("Sprinkler", sprinklerSchema);
module.exports = Sprinkler;
