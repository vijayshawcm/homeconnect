const express = require("express");

const {
  createHome,
  getHomes,
  getHomesByUserId,
  addDweller,
} = require("../controllers/home.controller");

const router = express.Router();
router.post("/", createHome);
router.get("/", getHomes);
router.get("/:id", getHomesByUserId);
router.patch("/:id", addDweller);

module.exports = router;
