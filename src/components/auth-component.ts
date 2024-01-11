
import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth-service';
import { IUserModel } from '../models/user-model';
import config from '../config/env/index';
import * as jwt from 'jsonwebtoken'
import { handleRouteError } from '../config/error';
import HandlerSucess from '../config/sucess';

// Credentials are used to login and return a token
export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const user: IUserModel = await AuthService.login(json_object); // Verificar si el usuario existe y la contraseña es válida
        const token: string =  jwt.sign({ email: user.email, id: user.id, type: 'session' },config.SECRET, { // Generate token
            expiresIn: config.TOKEN_EXPIRATION
        });
        res.status(200).json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('user_login'),
            security_context: {token}
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}
export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const user: any = await AuthService.signup(json_object);
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('user_registered'),
            content:  user
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}
