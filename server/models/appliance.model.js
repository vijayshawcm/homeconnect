const mongoose = require("mongoose");

const applianceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["on", "off"],
      default: "off",
    },
    powerConsumption: {
      type: Number,
      required: true,
    },
  },
  { discriminatorKey: "type" }
);

const ApplianceModel = mongoose.model("Appliance", applianceSchema);

// Fan Schema
const fanSchema = new mongoose.Schema({
  speed: { type: String, enum: ["low", "medium", "high"], default: "low" },
});

const FanModel = ApplianceModel.discriminator("Fan", fanSchema);

// AirConditioner Schema
const airConditionerSchema = new mongoose.Schema({
  temperature: { type: Number, required: true },
});

const AirConditionerModel = ApplianceModel.discriminator(
  "AirConditioner",
  airConditionerSchema
);

// Light Schema
const lightSchema = new mongoose.Schema({
  brightness: { type: Number, min: 0, max: 100, default: 100 },
});

const LightModel = ApplianceModel.discriminator("Light", lightSchema);

// Sprinkler Schema
const sprinklerSchema = new mongoose.Schema({
  waterFlowRate: { type: Number, required: true },
});

const SprinklerModel = ApplianceModel.discriminator(
  "Sprinkler",
  sprinklerSchema
);

module.exports = {
  ApplianceModel,
  FanModel,
  AirConditionerModel,
  LightModel,
  SprinklerModel,
};
