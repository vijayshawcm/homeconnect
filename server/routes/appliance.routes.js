const express = require("express");

const {
  createAppliance,
  getAppliancesByRoom,
  turnOnAppliance,
  turnOffAppliance,
  renameAppliance,
  adjustAppliance,
  scheduleAppliance,
  modifySchedule,
  deleteSchedule,
  automateAppliance,
  modifyAutomation,
  deleteAutomation,
  disableAppliance,
  enableAppliance,
  removeAppliance,
  executeSchedule,
} = require("../controllers/appliance.controller");

const router = express.Router();
router.put("/:id", createAppliance);
router.get("/:id", getAppliancesByRoom);
router.patch("/turnOff/:id", turnOffAppliance);
router.patch("/turnOn/:id", turnOnAppliance);
router.patch("/rename/:id", renameAppliance);
router.put("/schedules/:id", scheduleAppliance);
router.patch("/schedules/modify/:id", modifySchedule);
router.post("/schedules/execute/:id", executeSchedule);
router.delete("/schedules/:id", deleteSchedule);
router.put("/automations/:id", automateAppliance);
router.patch("/automations/modify/:id", modifyAutomation);
router.delete("/automations/:id", deleteAutomation,)
router.patch("/disable/:id", disableAppliance);
router.patch("/enable/:id", enableAppliance);
router.patch("/adjust/:id", adjustAppliance);
router.delete("/:id", removeAppliance);

module.exports = router;
