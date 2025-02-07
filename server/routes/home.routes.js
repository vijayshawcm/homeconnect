const express = require("express");

const { createHome, getRooms } = require("../controllers/home.controller");

const router = express.Router();
router.post("/", createHome);
router.get("/:id", getRooms);

module.exports = router;
