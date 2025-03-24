const express = require("express");

const {
  geoAutocomplete,
  generateGeocode
} = require("../controllers/google.controller");

const router = express.Router();
router.get("/autocomplete", geoAutocomplete);
router.get("/reverseGeocode", generateGeocode);

module.exports = router;