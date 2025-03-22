const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EnergyProfile = require("./energyProfile.model");

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["bedroom", "living_room", "kitchen", "bathroom", "other"],
    required: true,
  },
  home: {
    type: Schema.Types.ObjectId,
    ref: "Home",
    required: true,
  },
  appliances: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appliance",
    },
  ],
  occupancyStatus: {
    type: Boolean,
    default: false,
  },
  energyProfile: {
    type: Schema.Types.ObjectId,
    ref: "EnergyProfile",
  },
  methods: {},
});

// Pre-save hook to auto-create an EnergyProfile if missing
roomSchema.pre("save", async function (next) {
  if (!this.energyProfile) {
    const energyProfile = await EnergyProfile.create({});
    this.energyProfile = energyProfile._id;
  }
  next();
});

// Pre-remove hook to delete the associated energyProfile
roomSchema.pre("deleteOne", { document: true }, async function (next) {
  try {
    if (this.energyProfile) {
      await EnergyProfile.findByIdAndDelete(this.energyProfile);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Post-save hook to update the home's energyProfile
roomSchema.post("save", async function (doc) {
  try {
    const { updateHomeEnergyProfile } = require("../utils/energyProfile.utils"); // Lazy load
    // Update the home's energyProfile whenever a room is saved
    await updateHomeEnergyProfile(doc.home);
  } catch (error) {
    console.error("Error in post-save hook:", error.message);
  }
});

// Post-save hook to update the home's energyProfile
roomSchema.post("findByIdAndUpdate", async function (doc) {
  try {
    const { updateHomeEnergyProfile } = require("../utils/energyProfile.utils"); // Lazy load
    // Update the home's energyProfile whenever a room is saved
    await updateHomeEnergyProfile(doc.home);
  } catch (error) {
    console.error("Error in post-save hook:", error.message);
  }
});

const RoomModel = mongoose.model("Room", roomSchema);
module.exports = RoomModel;
