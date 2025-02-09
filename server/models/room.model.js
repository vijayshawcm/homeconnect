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

const RoomModel = mongoose.model("Room", roomSchema);
module.exports = RoomModel;
