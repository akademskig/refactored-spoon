import jwt from 'jsonwebtoken';
import config from '../config';

export const verifyToken = <T>(token: string): T => {
  try {
    return jwt.verify(token, config.EMAIL_VERIFICATION_SECRET!) as T;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
