const express = require("express");

const {
  updateEmail,
  updatePassword,
  updateUsername,
  updateDisplayName,
  updateTheme,
  updateNotificationChannel,
  updateNotificationType,
  updateAccountStatus,
  updateTwoFactor
} = require("../controllers/user.controller");

const router = express.Router();
router.patch("/updateEmail", updateEmail);
router.patch("/updatePassword", updatePassword);
router.patch("/updateUsername", updateUsername);
router.patch("/updateDisplayName", updateDisplayName);
router.patch("/updateTheme", updateTheme);
router.patch("/updateNotificationChannel", updateNotificationChannel);
router.patch("/updateNotificationType", updateNotificationType);
router.patch("/accountStatus", updateAccountStatus);
router.patch("/twoFactorAuthentication", updateTwoFactor);

module.exports = router;