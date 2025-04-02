import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { connectMongo } from './db/connectMongo';
import config from './config';

const app = express();

const allowedOrigins = [
  config.CLIENT_URL,
  config.TEST_CLIENT_URL, // For tests
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
connectMongo();
app.use('/api', routes);

app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
