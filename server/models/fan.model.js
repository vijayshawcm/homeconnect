const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BaseAppliance = require("./appliance.model");
const EnergyProfile =  require("./energyProfile.model")

// Fan Schema
const fanSchema = new Schema({
  currentSpeed: { type: Number, default: 0 },
  speedLevels: {
    type: Number,
    required: true,
    default: 3,
  },
});

// Pre-save hook to set energyConsumption in energyProfile for Light appliances
fanSchema.pre("save", async function (next) {
  try {
    // Check if the document is newly created (not an update)
    if (this.isNew) {
      // If energyProfile already exists (created by the base schema hook), update it
      if (this.energyProfile) {
        await EnergyProfile.findByIdAndUpdate(this.energyProfile, {
          energyConsumption: 45, // Set default energyConsumption for Light
        });
      } else {
        // If energyProfile does not exist, create a new one
        const energyProfile = await EnergyProfile.create({
          energyConsumption: 45, // Set default energyConsumption for Light
        });
        this.energyProfile = energyProfile._id;
      }
    }

    next();
  } catch (error) {
    next(error); // Pass any errors to Mongoose
  }
});

const Fan = BaseAppliance.discriminator("Fan", fanSchema);
module.exports = Fan;
