const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
});

module.exports = mongoose.model("User", userSchema);