const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

var userSchema = new mongoose.Schema({
  username: String,
  username_lower: String,
  email: String,
  passwordHash: String,
});

// Generates password hash and lowercase username
userSchema.pre("save", async function (next) {
  // Check if field is modified to prevent presave function running twice on same field
  try {
    if(this.isModified("passwordHash")) {
      this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    }
    
    if(this.isModified("username")) {
      this.username_lower = this.username.toLowerCase();
    }

    next();
  } catch (err) {
    next(err); //Pass error up the chain
  }
  
});

module.exports = mongoose.model("User", userSchema);