import express from 'express';
import jwtCheck from '../../middleware/validateToken';
import { deleteUser, getUser } from '../controllers/user.controller';

const router = express.Router()

// Use middleware to authorize request
router.use(jwtCheck)

router.get("/", getUser)
router.delete("/", deleteUser)
export default router;