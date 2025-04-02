import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';

export type TokenType = 'signin' | 'email';

export const generateToken = (payload: object, expiresIn: string, tokenType: TokenType): string => {
  const secret: Secret =
    tokenType === 'signin' ? config.JWT_SECRET : config.EMAIL_VERIFICATION_SECRET;
  // @ts-ignore
  return jwt.sign(payload, secret, { expiresIn });
};
