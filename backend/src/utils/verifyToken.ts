import jwt from 'jsonwebtoken';

export const verifyToken = <T>(token: string): T => {
  try {
    return jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET!) as T;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
