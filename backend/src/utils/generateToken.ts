import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (payload: object, expiresIn: string): string => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn });
};
