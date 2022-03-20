import express from 'express';
import { createPatient, loginPatient } from '../controllers/patient/auth.controller';

const router = express.Router()

router.post("/patient/create", createPatient)
router.post("/patient/login", loginPatient)

module.exports = router;