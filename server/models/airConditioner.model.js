const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BaseAppliance = require("./appliance.model");
const EnergyProfile = require("./energyProfile.model");

// AirConditioner Schema
const airConditionerSchema = new Schema({
  mode: { type: String, enum: ["auto", "cool", "dry"], default: "auto" },
  swing: { type: Boolean, default: false },
  temperature: { type: Number, default: "28" },
  timer: { type: Number, default: 0 }, // Timer duration in minutes
  timerActive: { type: Boolean, default: false }, // Whether the timer is active
});

// Middleware to handle timer logic
airConditionerSchema.pre("save", function (next) {
  if (this.timerActive && this.timer > 0) {
    // Convert timer duration from minutes to milliseconds
    const timerDuration = this.timer * 60 * 1000;

    // Set a timeout to turn off the air conditioner when the timer expires
    setTimeout(async () => {
      try {
        const updatedAppliance = await this.model(
          "AirConditioner"
        ).findByIdAndUpdate(
          this._id,
          { status: "off", timer: 0, timerActive: false },
          { new: true }
        );
        console.log(
          "Air Conditioner turned off due to timer:",
          updatedAppliance
        );
      } catch (error) {
        console.error("Error turning off Air Conditioner:", error);
      }
    }, timerDuration);
  }
  next();
});

// Pre-save hook to set energyConsumption in energyProfile for AC appliances
airConditionerSchema.pre("save", async function (next) {
  try {
    // Check if the document is newly created (not an update)
    if (this.isNew) {
      // If energyProfile already exists (created by the base schema hook), update it
      if (this.energyProfile) {
        await EnergyProfile.findByIdAndUpdate(this.energyProfile, {
          energyConsumption: 1000, // Set default energyConsumption for AC
        });
      } else {
        // If energyProfile does not exist, create a new one
        const energyProfile = await EnergyProfile.create({
          energyConsumption: 1000, // Set default energyConsumption for AC
        });
        this.energyProfile = energyProfile._id;
      }
    }

    next();
  } catch (error) {
    next(error); // Pass any errors to Mongoose
  }
});

const AirConditioner = BaseAppliance.discriminator(
  "AirConditioner",
  airConditionerSchema
);
module.exports = AirConditioner;
