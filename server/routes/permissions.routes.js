const express = require("express");

const {
    createInvite,
    acceptInvite,
    modifyPermissions,
    removeDweller,
} = require("../controllers/permissions.controller");

const router = express.Router();
router.patch("/invite", createInvite);
router.patch("/join", acceptInvite);
router.patch("/dweller", modifyPermissions);
router.patch("/remove", removeDweller)

module.exports = router;
