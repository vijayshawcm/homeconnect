const express = require("express");

const {
  createRoom,
  getRoomsByHome,
  deleteRoom,
} = require("../controllers/room.controller");

const router = express.Router();
router.post("/", createRoom);
router.get("/:id", getRoomsByHome);
router.delete("/:id", deleteRoom);

module.exports = router;
