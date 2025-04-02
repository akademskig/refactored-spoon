import { Request, Response, NextFunction } from 'express';
import authMiddleware from './auth.middleware';
import { verifyToken } from '../utils/verifyToken';
import { AuthRequest } from '../types/AuthRequest';
import { ReqUser } from '../types/ReqUser';

jest.mock('../utils/verifyToken');

describe('authMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { cookies: {} };
    res = {
      sendStatus: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if no token is provided', () => {
    authMiddleware(req as Request, res as Response, next as NextFunction);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token verification fails', () => {
    req.cookies = { accessToken: 'invalidToken' };
    (verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req as Request, res as Response, next as NextFunction);

    expect(verifyToken).toHaveBeenCalledWith('invalidToken', 'signin');
    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('should set the user on the request and call next if token is valid', () => {
    const mockUser: ReqUser = { id: 'userId123' };
    req.cookies = { accessToken: 'validToken' };
    (verifyToken as jest.Mock).mockReturnValue(mockUser);

    authMiddleware(req as Request, res as Response, next as NextFunction);

    expect(verifyToken).toHaveBeenCalledWith('validToken', 'signin');
    expect((req as AuthRequest).user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });
});
