import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';

export type TokenType = 'signin' | 'email';

/**
 * Generates a JSON Web Token (JWT) based on the provided payload, expiration time, and token type.
 *
 * @param payload - The data to be encoded into the token.
 * @param expiresIn - The duration for which the token is valid (e.g., "1h", "7d").
 * @param tokenType - The type of token to generate. Determines which secret key to use.
 *                    Use 'signin' for authentication tokens and other values for email verification tokens.
 * @returns The generated JWT as a string.
 *
 * @throws Will throw an error if the token cannot be generated.
 */
export const generateToken = (payload: object, expiresIn: string, tokenType: TokenType): string => {
  const secret: Secret =
    tokenType === 'signin' ? config.JWT_SECRET : config.EMAIL_VERIFICATION_SECRET;
  // @ts-ignore
  return jwt.sign(payload, secret, { expiresIn });
};
