const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BaseAppliance = require("./appliance.model");

// Fan Schema
const fanSchema = new Schema({
  speed: { type: String, enum: ["low", "medium", "high"], default: "low" },
});

const Fan = BaseAppliance.discriminator("Fan", fanSchema);
module.exports = Fan;
