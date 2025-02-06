const express = require("express");

const { createHome } = require("../controllers/home.controller");

const router = express.Router();
router.post("/", createHome);

module.exports = router;
