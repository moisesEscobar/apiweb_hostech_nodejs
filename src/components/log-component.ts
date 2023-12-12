import LogService from '../services/log-service';
import { HttpError } from '../config/error';
import { ILogModel } from '../models/log-model';
import { NextFunction, Request, Response } from 'express';


export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const logs: ILogModel[] = await LogService.findAll();
        res.json({
            status: 200,
            message: 'Get logs successfull',
            content: logs
        });
    } catch (error) {
        if (error.code === 500) {
            return next(new HttpError(error.message.status, error.message));
        }
        res.json({
            status: 400,
            message: error.message
        });
    }
}