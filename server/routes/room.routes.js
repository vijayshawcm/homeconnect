const express = require("express");

const { createRoom } = require("../controllers/room.controller");

const router = express.Router();
router.post("/:id", createRoom);

module.exports = router;