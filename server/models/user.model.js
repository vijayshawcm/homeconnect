const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

var userSchema = new mongoose.Schema(
  {
    username: String,
    usernameLower: String,
    displayName: String,
    email: String,
    passwordHash: String,
    aboutMe: String,
    location: String,
    //TODO: make settings schema ***settings: Schema.ObjectID, 
  }, 
  {
    timestamps: true 
  }
);

// Generates password hash and lowercase username on save
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

// Generates password hash on update
userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate(); // Get update object containing updated fields.
    update.passwordHash = await bcrypt.hash(update.passwordHash, 10);

    this.setUpdate(update); // Pass hashed password to document.
  } catch (err) {
    next(err); //Pass error up the chain
  }
});

module.exports = mongoose.model("User", userSchema);