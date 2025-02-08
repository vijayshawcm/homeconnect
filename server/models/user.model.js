const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
});

module.exports = mongoose.model("User", userSchema);