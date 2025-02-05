const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["bedroom", "living_room", "kitchen", "kitchen", "bathroom", "other"],
    required: true,
  },
  occupancyStatus: {
    type: Boolean,
    default: false,
  },
  energyProfile: {
    totalConsumption: {
      type: Number,
      default: 0,
    },
    previousDayConsumption: {
      type: Number,
      default: 0,
    },
    targetConsumption: {
      type: Number,
      default: null,
    },
  },
});

const RoomModel = mongoose.model("Room", roomSchema);
module.exports = RoomModel;