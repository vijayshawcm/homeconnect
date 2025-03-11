const express = require("express");

const {
  createRoom,
  getRoomsByHome,
  getRoomById,
  deleteRoom,
} = require("../controllers/room.controller");

const router = express.Router();
router.post("/", createRoom);
router.get("/:id", getRoomsByHome);
router.get("/roomId/:id", getRoomById)
router.delete("/:id", deleteRoom);

module.exports = router;
