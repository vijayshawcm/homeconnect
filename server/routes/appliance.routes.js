const express = require('express')

const {createAppliance, getAppliancesByRoom} = require('../controllers/appliance.controller')

const router = express.Router()
router.post('/', createAppliance)
router.get('/:id', getAppliancesByRoom)

module.exports = router