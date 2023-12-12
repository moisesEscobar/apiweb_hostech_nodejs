import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../error';
import * as http from 'http';
import config from '../env/index';

interface RequestWithUser extends Request {
    user: object | string;
}
export function isAuthenticated(req: RequestWithUser, res: Response, next: NextFunction): void {
    const token: any = req.headers['x-access-token'];
    if (token) {
        try {
          const user: object | string = jwt.verify(token, config.SECRET);
          req.user = user;
          return next();
        } catch (error) {
          return next(new HttpError(401, http.STATUS_CODES[401]));
        }
    }
    return next(new HttpError(400, 'No token provided'));
}

