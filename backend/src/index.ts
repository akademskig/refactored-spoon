import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { connectMongo } from './db/connectMongo';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', 
    credentials: true,
  }),
);
app.use(express.json());
connectMongo();
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
