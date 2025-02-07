const express = require("express");

const { createRoom, getAppliances } = require("../controllers/room.controller");

const router = express.Router();
router.post("/", createRoom);
router.get("/:id", getAppliances);

module.exports = router;
