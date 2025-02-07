const express = require('express')

const {createAppliance} = require('../controllers/appliance.controller')

const router = express.Router()
router.post('/', createAppliance)

module.exports = router