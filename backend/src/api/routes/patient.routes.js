import express from 'express';
import jwtCheck from '../../middleware/validateToken';
import { createAppointment, getAppointments, updateAppointment } from '../controllers/appointment.controller';
import { updateProfile, deleteAccount } from '../controllers/patient.controller';

const router = express.Router()

// Use middleware to authorize request
router.use(jwtCheck)

// Register patient routes
router.post("/appointment", createAppointment)

router.get("/appointments", getAppointments)

router.patch('/appointment/:id', updateAppointment)

router.put("/update/:id", updateProfile)

router.delete("/:id", deleteAccount)

export default router;