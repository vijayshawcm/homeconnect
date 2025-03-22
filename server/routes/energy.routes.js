const express = require("express");

const {
  getTotalTypeCurrentUsage
} = require("../controllers/energy.controller");

const router = express.Router();
router.get("/totalTypeCurrentUsage/:id/:type", getTotalTypeCurrentUsage);

module.exports = router;
