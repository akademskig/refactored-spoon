import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Helper function to enforce required environment variables
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not defined.`);
  }
  return value;
};

// Define and validate environment variables
const config = {
  PORT: getEnvVar('PORT', '5000'), // Default to 5000 if not provided
  MONGO_URI: getEnvVar('MONGO_URI'), // Required
  CLIENT_URL: getEnvVar('CLIENT_URL', 'http://localhost:5173'), // Default to localhost
  TEST_CLIENT_URL: getEnvVar('TEST_CLIENT_URL', 'http://localhost:3000'), // Default for tests
  JWT_SECRET: getEnvVar('JWT_SECRET'), // Required
  EMAIL_VERIFICATION_SECRET: getEnvVar('EMAIL_VERIFICATION_SECRET', 'default_secret'), // Default value
  NEWS_API_KEY: getEnvVar('NEWS_API_KEY'), // Required
  NYT_API_KEY: getEnvVar('NYT_API_KEY'), // Required
  SENDGRID_API_KEY: getEnvVar('SENDGRID_API_KEY'), // Required
  SENDGRID_FROM_EMAIL: getEnvVar('SENDGRID_FROM_EMAIL'), // Required
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
};

export default config;
