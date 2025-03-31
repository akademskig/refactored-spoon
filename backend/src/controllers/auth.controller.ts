import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import { handleError } from '../utils/handleError';
import { sendVerificationEmail } from '../utils/sendVerificationEmail';
import { verifyToken } from '../utils/verifyToken';
import { UserModel } from '../db/models/User';

// Signup controller
export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return handleError(res, 400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      firstName,
      lastName,
      email,
      hashedPassword,
      verified: false,
    });

    const verificationToken = generateToken({ userId: user._id }, '24h');

    await user.save();
    sendVerificationEmail(email, verificationToken);

    res.status(201).json({ msg: 'User created. Check email for verification.' });
  } catch (error) {
    console.error('Error during signup:', error);
    handleError(res, 500, 'Internal server error');
  }
};

// Verify email controller
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const decoded = verifyToken<{ userId: string }>(token);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return handleError(res, 404, 'User not found');
    }

    if (user.verified) {
      return handleError(res, 400, 'User already verified');
    }

    user.verified = true;
    await user.save();

    res.status(200).json({ msg: 'Email verified successfully' });
  } catch (error) {
    console.error('Error during email verification:', error);
    handleError(res, 400, 'Verification link is invalid or has expired');
  }
};

// Signin controller
export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
      return handleError(res, 401, 'Invalid credentials');
    }

    const token = generateToken({ id: user.id }, '1d');
    const { firstName, lastName } = user.toJSON();

    res
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ user: { firstName, lastName } });
  } catch (error) {
    console.error('Error during signin:', error);
    handleError(res, 500, 'Internal server error');
  }
};

// Logout controller
export const logout = (_: Request, res: Response) => {
  res.clearCookie('accessToken').json({ msg: 'Logged out' });
};
