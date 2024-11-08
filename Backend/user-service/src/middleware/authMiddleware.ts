// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
        
        // Use a Promise here for clarity
        await User.findById(decoded.id).then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Populate req.user with the user data
            req.user = user; 
            next(); // Call the next middleware
        }).catch(err => {
            return res.status(500).json({ message: 'Error retrieving user data', error: err.message });
        });

    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
