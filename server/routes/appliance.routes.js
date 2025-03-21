const express = require("express");

const {
  createAppliance,
  getAppliancesByRoom,
  turnOnAppliance,
  turnOffAppliance,
  renameAppliance,
  modifyAppliance,
  disableAppliance,
  removeAppliance,
} = require("../controllers/appliance.controller");

const router = express.Router();
router.put("/:id", createAppliance);
router.get("/:id", getAppliancesByRoom);
router.patch("/turnOff/:id", turnOffAppliance);
router.patch("/turnOn/:id", turnOnAppliance);
router.patch("/rename/:id", renameAppliance);
router.patch("/disable/:id", disableAppliance);
router.patch("/modify/:id", modifyAppliance);
router.delete("/:id", removeAppliance);

module.exports = router;
