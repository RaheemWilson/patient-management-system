const express = require('express');
const authController = require('../controllers/auth.controller.js');

const router = express.Router()

// Register auth routes
router.post("/patient/create", authController.createPatient)
router.post("/patient/login", authController.loginPatient)
router.post("/doctor/create", authController.createDoctor)
router.post("/doctor/login", authController.loginDoctor)

module.exports = router;