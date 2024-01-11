import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import {HttpError} from '../error';
import * as http from 'http';
import config from '../env/index';

interface RequestWithUser extends Request {
    user: object | string;
}

export function isAuthenticated(req: RequestWithUser, res: Response, next: NextFunction): void {
  const token: any = req.headers['x-access-token'];
  if (!token) {
    return next(new HttpError(401, 'NotToken'));
  }
  jwt.verify(token, config.SECRET, (err: any, user: any) => {
    if (err) {
      return next(new HttpError(403, http.STATUS_CODES[403]));// Token inválido o expirado
    }
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    const time_to_expire = user.exp - currentTime; // Tiempo restante para que expire el token
    if (time_to_expire < (5*60) ) { // Si el token está próximo a expirar (p.ej., en menos de 5 minutos)
        console.log("REFRES TOKEN")
        const new_token = jwt.sign({ email: user.email, id: user.id, type: 'session' }, config.SECRET, { expiresIn: config.TOKEN_EXPIRATION});
        res.setHeader('x-access-token', new_token); // req.headers['x-access-token']= new_token; // Enviamos el nuevo token
    }
    req.user = user; // Opcional, para usar en la ruta
    next();
  });
}
