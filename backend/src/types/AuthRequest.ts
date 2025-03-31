import { Request } from 'express';
import { ReqUser } from './ReqUser';

export interface AuthRequest extends Request {
  user: ReqUser;
}
