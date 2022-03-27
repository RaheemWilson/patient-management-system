import express from 'express';
import jwtCheck from '../../middleware/validateToken';
import { getDoctors } from '../controllers/doctor.controller';

const router = express.Router()

// Use middleware to authorize request
router.use(jwtCheck)

router.get("/", getDoctors)
export default router;