import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/AuthRequest';
import { ReqUser } from '../types/ReqUser';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as AuthRequest).user = decoded as ReqUser;
    next();
  } catch {
    res.sendStatus(401);
  }
};
export default authMiddleware;
