const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Base Appliance Schema
const applianceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["on", "off", "disabled"],
      default: "off",
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    powerConsumption: {
      current: {
        type: Number,
        default: 0,
      },
      dailyConsumption: {
        type: Number,
        default: 0,
      },
      monthlyConsumption: {
        type: Number,
        default: 0,
      },
    },
    schedules: [
      {
        startTime: Date,
        endTime: Date,
        days: [
          {
            type: String,
            enum: [
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ],
          },
        ],
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    discriminatorKey: "applianceType",
  }
);

// Create the base model
const ApplianceModel = mongoose.model("Appliance", applianceSchema);
module.exports = ApplianceModel;
