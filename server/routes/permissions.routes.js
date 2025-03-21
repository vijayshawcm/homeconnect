const express = require("express");

const {
    createInvite,
    acceptInvite,
    modifyPermissions,
} = require("../controllers/permissions.controller");

const router = express.Router();
router.patch("/invite", createInvite);
router.patch("/join", acceptInvite);
router.patch("/dweller", modifyPermissions);

module.exports = router;
