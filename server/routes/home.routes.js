const express = require("express");

const { createHome, getHomes } = require("../controllers/home.controller");

const router = express.Router();
router.post("/", createHome);
router.get("/", getHomes);

module.exports = router;
