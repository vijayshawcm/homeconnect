const express = require("express");

const {
    createInvite
} = require("../controllers/permissions.controller");

const router = express.Router();
router.patch("/invite", createInvite);

module.exports = router;
