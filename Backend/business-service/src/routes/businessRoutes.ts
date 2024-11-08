import express from 'express';
import { createBusiness } from '../controller/businessController'; // Adjust path to your controller

const router = express.Router();

// Route to create a new business
router.post('/business', createBusiness);

export default router;
