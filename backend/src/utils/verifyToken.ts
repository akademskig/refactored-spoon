import jwt from 'jsonwebtoken';
import config from '../config';
import { TokenType } from './generateToken';

export const verifyToken = <T>(token: string, tokenType: TokenType): T => {
  const secret = tokenType === 'signin' ? config.JWT_SECRET : config.EMAIL_VERIFICATION_SECRET;
  try {
    return jwt.verify(token, secret) as T;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
