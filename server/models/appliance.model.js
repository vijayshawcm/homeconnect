const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EnergyProfile = require("./energyProfile.model");

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

// Pre-save hook to auto-create an EnergyProfile if missing
applianceSchema.pre("save", async function (next) {
  if (!this.energyProfile) {
    const energyProfile = await EnergyProfile.create({});
    this.energyProfile = energyProfile._id;
  }
  next();
});

// Pre-remove hook to delete the associated energyProfile
applianceSchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    if (this.energyProfile) {
      console.log("Deleting energyProfile for appliance:", this._id);
      await EnergyProfile.findByIdAndDelete(this.energyProfile);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Post-save hook to update the room's energyProfile
applianceSchema.post("save", async function (doc) {
  try {
    const { updateRoomEnergyProfile } = require("../utils/energyProfile.utils"); // Lazy load
    // Update the room's energyProfile whenever an appliance is saved
    await updateRoomEnergyProfile(doc.room);
  } catch (error) {
    console.error("Error in post-save hook:", error.message);
  }
});

// Create the base model
const ApplianceModel = mongoose.model("Appliance", applianceSchema);
module.exports = ApplianceModel;
