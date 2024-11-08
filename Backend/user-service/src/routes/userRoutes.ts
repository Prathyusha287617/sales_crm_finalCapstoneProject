// src/routes/userRoutes.ts
import { Router } from 'express';
import { register, login, getBranchData } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Route for user registration
router.post('/register', register as any);

// Route for user login
router.post('/login', login as any);

// Route to get branch-specific data
router.get('/branch-data', authMiddleware as any, getBranchData as any);

export default router;
