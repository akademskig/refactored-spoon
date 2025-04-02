import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { signin } from './auth.controller';
import { UserModel } from '../db/models/User';
import { generateToken } from '../utils/generateToken';
import { handleError } from '../utils/handleError';

jest.mock('bcryptjs');
jest.mock('../db/models/User');
jest.mock('../utils/generateToken');
jest.mock('../utils/handleError');

describe('signin', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let cookieMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    cookieMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = { body: {} };
    res = { status: statusMock, json: jsonMock, cookie: cookieMock };
    jest.clearAllMocks();
  });

  it('should return 401 if the user is not found', async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);

    req.body = { email: 'test@example.com', password: 'password123' };

    await signin(req as Request, res as Response);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(handleError).toHaveBeenCalledWith(res, 401, 'User not found');
  });

  it('should return 401 if the password is invalid', async () => {
    const mockUser = { hashedPassword: 'hashedPassword123' };
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    req.body = { email: 'test@example.com', password: 'wrongPassword' };

    await signin(req as Request, res as Response);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword123');
    expect(handleError).toHaveBeenCalledWith(res, 401, 'Invalid credentials');
  });

  it('should return a token and user details if credentials are valid', async () => {
    const mockUser = {
      id: 'userId123',
      hashedPassword: 'hashedPassword123',
      toJSON: jest.fn().mockReturnValue({ firstName: 'John', lastName: 'Doe' }),
    };
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue('mockToken');

    req.body = { email: 'test@example.com', password: 'password123' };

    await signin(req as Request, res as Response);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword123');
    expect(generateToken).toHaveBeenCalledWith({ id: 'userId123' }, '1d', 'signin');
    expect(res.cookie).toHaveBeenCalledWith('accessToken', 'mockToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });
    expect(res.json).toHaveBeenCalledWith({ user: { firstName: 'John', lastName: 'Doe' } });
  });

  it('should handle errors and return a 500 status code if an exception occurs', async () => {
    (UserModel.findOne as jest.Mock).mockImplementation(() => {
      throw new Error('Database error');
    });

    req.body = { email: 'test@example.com', password: 'password123' };

    await signin(req as Request, res as Response);

    expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(handleError).toHaveBeenCalledWith(res, 500, 'Internal server error');
  });
});