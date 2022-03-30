const express = require('express');
const jwtCheck = require('../../middleware/validateToken.js');
const doctorController = require('../controllers/doctor.controller.js');

const router = express.Router()

// Use middleware to authorize request
router.use(jwtCheck)

router.get("/", doctorController.getDoctors)

module.exports = router