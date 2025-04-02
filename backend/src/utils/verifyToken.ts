import jwt from 'jsonwebtoken';
import config from '../config';
import { TokenType } from './generateToken';

/**
 * Verifies a given token and decodes its payload.
 *
 * @template T - The expected type of the decoded token payload.
 * @param {string} token - The token to be verified.
 * @param {TokenType} tokenType - The type of the token, used to determine the appropriate secret key.
 * @returns {T} - The decoded payload of the token.
 * @throws {Error} - Throws an error if the token is invalid or expired.
 */
export const verifyToken = <T>(token: string, tokenType: TokenType): T => {
  const secret = tokenType === 'signin' ? config.JWT_SECRET : config.EMAIL_VERIFICATION_SECRET;
  try {
    return jwt.verify(token, secret) as T;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
