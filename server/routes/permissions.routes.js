const express = require("express");

const {
    createInvite,
    acceptInvite
} = require("../controllers/permissions.controller");

const router = express.Router();
router.patch("/invite", createInvite);
router.patch("/join", acceptInvite)

module.exports = router;
