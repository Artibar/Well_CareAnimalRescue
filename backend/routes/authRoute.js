import express from "express";
import {login, signup, logout, getCurrentUser} from '../controller/authController.js'
import {protect} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login);
router.get('/me', protect, getCurrentUser)
router.post('/logout', protect, logout);

export default router