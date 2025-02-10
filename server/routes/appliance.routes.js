const express = require("express");

const {
  createAppliance,
  getAppliancesByRoom,
  toggleAppliance,
  disableAppliance,
  deleteAppliance,
} = require("../controllers/appliance.controller");

const router = express.Router();
router.post("/:id", createAppliance);
router.get("/:id", getAppliancesByRoom);
router.patch("/:id", toggleAppliance);
router.patch("/disable/:id", disableAppliance);
router.delete("/:id", deleteAppliance);

module.exports = router;
