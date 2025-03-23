const express = require("express");

const {
  createRoom,
  getRoomsByHome,
  getRoomById,
  modifyRoom,
  deleteRoom,
} = require("../controllers/room.controller");

const router = express.Router();
router.post("/", createRoom);
router.get("/:id", getRoomsByHome);
router.get("/roomId/:id", getRoomById);
router.patch("/:id", modifyRoom);
router.delete("/:id", deleteRoom);

module.exports = router;
