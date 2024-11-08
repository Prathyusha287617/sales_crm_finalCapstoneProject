// app.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig'; // Import the dbConfig file
import userRoutes from './routes/userRoutes';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
