import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/dbConnection.js';

import authRouter from "./routes/auth.routes.js"
import groceryRouter from './routes/grocery.routes.js'

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/groceries',groceryRouter);


//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});