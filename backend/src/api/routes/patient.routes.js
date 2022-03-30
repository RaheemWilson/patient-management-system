const express = require('express');
const jwtCheck = require('../../middleware/validateToken.js');
const appointmentController = require( '../controllers/appointment.controller.js');
const patientController =  require('../controllers/patient.controller.js');

const router = express.Router()

// Use middleware to authorize request
router.use(jwtCheck)

// Register patient routes
router.post("/appointment", appointmentController.createAppointment)

router.get("/appointments", appointmentController.getAppointments)

router.patch('/appointment/:id', appointmentController.updateAppointment)

router.put("/update/:id", patientController.updateProfile)

router.delete("/:id", patientController.deleteAccount)

module.exports = router