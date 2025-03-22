const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EnergyProfile = require("./energyProfile.model")

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
    energyProfile: {
      type: Schema.Types.ObjectId,
      ref: "EnergyProfile",
    },
    schedules: [
      {
        name: String,
        // Changing this to store int time in 24h format since Date stores unix timestamp
        startTime: {
          hour: Number,
          minute: Number
        },
        endTime: {
          hour: Number,
          minute: Number
        },
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
    automations: [
      {
        name: String,
        sensorType: String,
        threshold: Number,
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    interface: { 
      type: [String], // Stores information needed to interface with "hardware" [0] for on, [1] for off.
    },
    methods: {},
  },
  {
    timestamps: true,
    discriminatorKey: "applianceType",
  }
);

// Pre-save hook to auto-create an EnergyProfile if missing
applianceSchema.pre("save", async function (next) {
  if (!this.energyProfile) {
    const energyProfile = await EnergyProfile.create({});
    this.energyProfile = energyProfile._id;
  }
  next();
});

// Create the base model
const ApplianceModel = mongoose.model("Appliance", applianceSchema);
module.exports = ApplianceModel;
