const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BaseAppliance = require("./appliance.model");
const EnergyProfile = require("./energyProfile.model");


// Light Schema
const lightSchema = new Schema({
  colorTemperature: {
    type: String,
    enum: ["warm", "neutral", "cool"],
    default: "warm",
  },
  brightness: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
});

// Pre-save hook to set energyConsumption in energyProfile for Light appliances
lightSchema.pre("save", async function (next) {
  try {
    // Check if the document is newly created (not an update)
    if (this.isNew) {
      // If energyProfile already exists (created by the base schema hook), update it
      if (this.energyProfile) {
        await EnergyProfile.findByIdAndUpdate(this.energyProfile, {
          energyConsumption: 10, // Set default energyConsumption for Light
        });
      } else {
        // If energyProfile does not exist, create a new one
        const energyProfile = await EnergyProfile.create({
          energyConsumption: 10, // Set default energyConsumption for Light
        });
        this.energyProfile = energyProfile._id;
      }
    }

    next();
  } catch (error) {
    next(error); // Pass any errors to Mongoose
  }
});

const Light = BaseAppliance.discriminator("Light", lightSchema);
module.exports = Light;
