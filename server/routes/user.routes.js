const express = require("express");

const {
  updateEmail,
  updatePassword
} = require("../controllers/user.controller");

const router = express.Router();
router.patch("/updateEmail", updateEmail);
router.patch("/updatePassword", updatePassword);

module.exports = router;