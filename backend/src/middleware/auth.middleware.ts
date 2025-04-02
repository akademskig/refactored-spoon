import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/AuthRequest';
import { ReqUser } from '../types/ReqUser';
import { verifyToken } from '../utils/verifyToken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const decoded = verifyToken(token, 'signin');
    (req as AuthRequest).user = decoded as ReqUser;
    next();
  } catch {
    res.sendStatus(401);
  }
};
export default authMiddleware;
