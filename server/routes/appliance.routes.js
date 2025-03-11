const express = require("express");

const {
  createAppliance,
  getAppliancesByRoom,
  turnOnAppliance,
  turnOffAppliance,
  disableAppliance,
  deleteAppliance,
} = require("../controllers/appliance.controller");

const router = express.Router();
router.post("/:id", createAppliance);
router.get("/:id", getAppliancesByRoom);
router.patch("/turnOff/:id", turnOffAppliance);
router.patch("/turnOn/:id", turnOnAppliance)
router.patch("/disable/:id", disableAppliance);
router.delete("/:id", deleteAppliance);

module.exports = router;
