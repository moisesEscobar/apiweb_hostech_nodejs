import LogService from '../services/log-service';
import { handleRouteError } from '../config/error';
import { ILogModel } from '../models/log-model';
import { NextFunction, Request, Response } from 'express';
import HandlerSucess from '../config/sucess';


export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const logs: ILogModel[] = await LogService.findAll();
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','logs'),
            content: logs
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}
export async function search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const logs: ILogModel[] = await LogService.search(req.query);
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_search','logs'),
            content: logs,
            //page: req.query.page,
            page_size: req.query.page_size,
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const log: ILogModel = await LogService.findOne(parseInt(req.params.id));
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','log'),
            content: log
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}