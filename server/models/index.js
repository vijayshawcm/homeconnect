// Provides a single point of entry for all the models
// Example: const { Room, Fan, Light } = require('./models');
module.exports = {
  Room: require("./room.model"),
  BaseAppliance: require("./appliance.model"),
  Fan: require("./fan.model"),
  AirConditioner: require("./airConditioner.model"),
  Light: require("./light.model"),
  Sprinkler: require("./sprinkler.model"),
  Home: require("./home.model"),
  User: require("./user.model"),
};
