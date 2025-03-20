const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EnergyProfile = require("./energyProfile.model");

const homeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dwellers: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        // This thing uses presence based checking (permission is granted if key exists).
        accessLevel: {
          addRemoveDweller: { type: Boolean }, 
          modifyDweller: { type: Boolean }, 
          onOffAppliance: { type: Boolean, default: true }, 
          enableDisableAppliance: { type: Boolean }, 
          addRemoveAppliance: { type: Boolean }, 
          modifyAppliance: { type: Boolean } // ? Assuming this includes name and schedules
        },
      },
    ],
    activeInvites: [
      {
        invite: String,
        expiryDate: Date,
      }
    ],
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    energyProfile: {
      type: Schema.Types.ObjectId,
      ref: "EnergyProfile",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to auto-create an EnergyProfile if missing
homeSchema.pre("save", async function (next) {
  if (!this.energyProfile) {
    const energyProfile = await EnergyProfile.create({});
    this.energyProfile = energyProfile._id;
  }
  next();
});

const homeModel = mongoose.model("Home", homeSchema);
module.exports = homeModel;
