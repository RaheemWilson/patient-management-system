import express from 'express';
import jwtCheck from '../../middleware/validateToken';
import { createAppointment } from '../controllers/patient/appointment.controller';
import { updateProfile, deleteAccount } from '../controllers/patient/patient.controller';
const router = express.Router()

// Use middleware to authorize request
router.use(jwtCheck)

// Register patient routes
router.post("/appointment", createAppointment)
router.put("/update/:id", updateProfile)
router.delete("/:id", deleteAccount)

export default router;