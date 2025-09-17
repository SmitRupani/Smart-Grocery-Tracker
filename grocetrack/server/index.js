import express from 'express';
import cors from 'cors';

import connectDB from './config/dbConnection';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());


//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});