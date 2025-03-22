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
      accountStatus: { type: String, enum: ['active', 'deactivated'], default: 'active' },
      theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
      twoFactorAuthentication: { type: Boolean, default: false },
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
    // Password update
    if(update['userInfo.passwordHash']) {
      update['userInfo.passwordHash'] = await bcrypt.hash(update['userInfo.passwordHash'], 10);
    }

    // Username update
    if(update['userInfo.username']) {
      update['userInfo.usernameLower'] = update['userInfo.username'].toLowerCase();
    }

    // Theme update
    if(update['settings.theme']) {
      if(update['settings.theme'] != 'light' && update['settings.theme'] != 'dark' && update['settings.theme'] != 'system') {
        throw new Error("Invalid input received"); // Throw error to be handled at api call.
      }
    }

    // Notification channel update
    if(update['settings.notification.channels']) {
      update['settings.notification.channels'].forEach(element => {
        if(element!= 'email' && element != 'push' && element != 'sms') {
          throw new Error("Invalid input received"); // Throw error to be handled at api call.
        }
      });
    }

    // Notification type update
    if(update['settings.notification.types']) {
      update['settings.notification.types'].forEach(element => {
        if(element!= 'marketing' && element != 'security' && element != 'update' && element != 'reminder' && element != 'billing') {
          throw new Error("Invalid input received"); // Throw error to be handled at api call.
        }
      });
    }

    // Account status update
    if(update['settings.accountStatus']) {
      if(update['settings.accountStatus'] != 'active' && update['settings.accountStatus'] != 'deactivated') {
        throw new Error("Invalid input received"); // Throw error to be handled at api call.
      }
    }

    this.setUpdate(update); // Pass updated values to document.
  } catch (err) {
    next(err); // Pass error up the chain.
  }
});

module.exports = mongoose.model("User", userSchema);