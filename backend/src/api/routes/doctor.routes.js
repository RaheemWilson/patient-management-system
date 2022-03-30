import express from 'express';
import jwtCheck from '../../middleware/validateToken.js';
import { getDoctors } from '../controllers/doctor.controller.js';

const router = express.Router()

// Use middleware to authorize request
router.use(jwtCheck)

router.get("/", getDoctors)
export default router;