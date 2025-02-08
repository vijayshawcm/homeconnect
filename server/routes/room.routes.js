const express = require("express");

const {
  createRoom,
  getRoomsByHome,
} = require("../controllers/room.controller");

const router = express.Router();
router.post("/", createRoom);
router.get("/:id", getRoomsByHome);

module.exports = router;
