import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/dbConnection.js';

import authRouter from "./routes/auth.routes.js"
import groceryRouter from './routes/grocery.routes.js'

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow cookies to be sent
}))

//routes
app.use('/api/auth',authRouter);
app.use('/api/groceries',groceryRouter);


//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});