const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const energyProfileSchema = new Schema({
  currentUsage: {
    type: Number,
    default: 0,
  },
  weeklyConsumption: {
    type: Number,
    default: 0,
  },
  monthlyConsumption: {
    type: Number,
    default: 0,
  },
  previousDayConsumption: {
    type: Number,
    default: 0,
  },
  previousWeekConsumption: {
    type: Number,
    default: 0,
  },
  previousMonthConsumption: {
    type: Number,
    default: 0,
  },
});

const EnergyProfile = mongoose.model("EnergyProfiel", energyProfileSchema);
module.exports = EnergyProfile;
