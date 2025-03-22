const express = require("express");

const {
  getTotalTypeCurrentUsage
} = require("../controllers/energy.controller");

const router = express.Router();
router.get("/totalTypeCurrentUsage/:id", getTotalTypeCurrentUsage);

module.exports = router;
