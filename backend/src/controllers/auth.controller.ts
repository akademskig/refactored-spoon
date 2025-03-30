import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../utils/sendVerificationEmail';

const users: any[] = []; // In-memory for now

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  const existing = users.find((u) => u.email === email);
  if (existing) {
    res.status(400).json({ msg: 'User already exists' });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email,
    password: hashed,
    verified: false,
  };
  users.push(user);

  const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  sendVerificationEmail(email, token);
  res.status(201).json({ msg: 'User created. Check email for verification.' });
};

export const verifyEmail = (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { email }: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = users.find((u) => u.email === email);
    if (user) user.verified = true;
    res.send('Email verified!');
  } catch {
    res.status(400).send('Invalid or expired link');
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ msg: 'Invalid credentials' });
    return;
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
  res
    .cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    })
    .json({ token, user: { ...user, password: undefined } });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('accessToken').json({ msg: 'Logged out' });
};
