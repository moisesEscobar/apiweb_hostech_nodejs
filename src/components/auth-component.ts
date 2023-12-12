import HttpError from '../config/error';
import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth-service';
import { IUserModel } from '../models/user-model';
import config from '../config/env/index';
import * as jwt from 'jsonwebtoken'

// Credentials are used to login and return a token
export async function login(req: Request, res: Response, next: NextFunction): Promise < void > {
    try {
        let jsonObject: any = req.body.json ? JSON.parse(req.body.json) : req.body;

        // Verificar si el usuario existe y la contraseña es válida
        const user: IUserModel = await AuthService.login(jsonObject);
        // Generate token
        const token: string =  jwt.sign({ email: user.email, id: user.id, type: 'session' },config.SECRET, {
            expiresIn: '60m'
        });
        res.status(200).json({
            status: 200,
            message: 'Successfully logged in.',
            securityContext: {token}
        });
        next();
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
}
export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const jsonObject: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const emailEnc: any = await AuthService.signup(jsonObject.data);
        res.json({
            status: 200,
            data: {
                clave: 'OK',
                message: 'Registration completed successfully',
                content:  emailEnc
            }
        });
        
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            data: {
                clave: '400',
                message: error.message
            }
        });
    }
}
