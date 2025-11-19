import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js'; // We will create this next
import { logoutUser } from '../controllers/user.controller.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Private Route (Needs Token)
router.get('/me', protect, getMe);

export default router;