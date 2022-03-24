import express from 'express';
import { 
    createDoctor, 
    createPatient, 
    loginDoctor, 
    loginPatient 
} from '../controllers/auth.controller';

const router = express.Router()

// Register auth routes
router.post("/patient/create", createPatient)
router.post("/patient/login", loginPatient)
router.post("/doctor/create", createDoctor)
router.post("/doctor/login", loginDoctor)

module.exports = router;