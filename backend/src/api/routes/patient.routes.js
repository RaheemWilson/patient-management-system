import express from 'express';
import jwtCheck from '../../middleware/validateToken';
import { updateProfile } from '../controllers/patient/patient.controller';
const router = express.Router()


router.use(jwtCheck)
router.put("/update", updateProfile)

export default router;