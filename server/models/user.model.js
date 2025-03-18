const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

var userSchema = new mongoose.Schema(
  {
    userInfo: {
      username: String,
      usernameLower: String,
      displayName: String,
      email: String,
      passwordHash: String,
      aboutMe: String,
      location: String,
    },
    settings:  {
      accountStatus: { type: String, enum: ['active', 'inactive'], default: 'active' },
      theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
      twoFactorAuthentication: Boolean,
      notification: {
        channels: { type: [String], enum: ['email', 'push', 'sms'], default: ['email'] },
        types: { type: [String], enum: ['marketing', 'security', 'update', 'reminder', 'billing'], default: ['security', 'reminder']}
      },
    },
    sessions: [{
        platform: String,
        lastActive: Date,
      }]
  }, 
  {
    timestamps: true 
  }
);

// Generates password hash and lowercase username on save
userSchema.pre("save", async function (next) {
  // Check if field is modified to prevent presave function running twice on same field
  try {
    if(this.isModified("userInfo.passwordHash")) {
      this.userInfo.passwordHash = await bcrypt.hash(this.userInfo.passwordHash, 10);
    }
    
    if(this.isModified("userInfo.username")) {
      this.userInfo.usernameLower = this.userInfo.username.toLowerCase();
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

    // Check for appropriate updated field and handle update.
    if(update['userInfo.passwordHash']) {
      update['userInfo.passwordHash'] = await bcrypt.hash(update['userInfo.passwordHash'], 10);
    }

    if(update['userInfo.username']) {
      update['userInfo.usernameLower'] = update['userInfo.username'].toLowerCase();
    }

    if(update['settings.accountStatus']) {
      if(update['settings.accountStatus'] != 'active' && update['settings.accountStatus'] != 'inactive') {
        throw new Error("Invalid input received"); // Throw error to be handled at api call.
      }
    }

    this.setUpdate(update); // Pass updated values to document.
  } catch (err) {
    next(err); // Pass error up the chain.
  }
});

module.exports = mongoose.model("User", userSchema);