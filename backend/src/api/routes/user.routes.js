import express from 'express';
import jwtCheck from '../../middleware/validateToken.js';
import { deleteUser, getUser } from '../controllers/user.controller.js';

const router = express.Router()

// Use middleware to authorize request
router.use(jwtCheck)

router.get("/", getUser)
router.delete("/", deleteUser)
export default router;