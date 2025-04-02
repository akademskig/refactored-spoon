import mongoose from 'mongoose';
import config from '../config';

const MAX_RETRIES = 5; // Maximum number of retry attempts
const RETRY_DELAY = 5000; // Delay between retries in milliseconds (5 seconds)

export const connectMongo = async () => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await mongoose.connect(config.MONGO_URI!);
      console.log('✅ MongoDB connected');
      return; // Exit the function if the connection is successful
    } catch (error) {
      retries++;
      console.error(`❌ MongoDB connection error (attempt ${retries}):`, error);

      if (retries < MAX_RETRIES) {
        console.log(`🔄 Retrying connection in ${RETRY_DELAY / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
      } else {
        console.error('❌ Maximum retry attempts reached. Could not connect to MongoDB.');
        process.exit(1); // Exit the process if all retries fail
      }
    }
  }
};
