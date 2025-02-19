const express = require("express");
// Multer used for form handling but idk if i wanna keep it cuz html forms use urlencoding
const multer = require("multer");
const upload = multer();

const {
  loginStatus,
  registerUser,
  loginUser,
  logoutUser,
  sendOTP,
  verifyOTP,
  modifyPassword
} = require("../controllers/user.controller");

const router = express.Router();
router.get("/loginStatus", loginStatus);
router.get("/logout", logoutUser)
router.post("/register", upload.none(), registerUser);
router.post("/login", loginUser);
router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);
router.post("/modifyPassword", modifyPassword);

module.exports = router;