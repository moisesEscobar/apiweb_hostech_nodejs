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
export async function search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const logs: ILogModel[] = await LogService.search(req.query);
        res.json({
            status: 200,
            message: 'Searchs logs successfull',
            content: logs,
            //page: req.query.page,
            page_size: req.query.page_size,
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

export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const log: ILogModel = await LogService.findOne(parseInt(req.params.id));
        res.json({
            status: 200,
            message: 'Get log successfull',
            content: log
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