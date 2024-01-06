import SaleService from '../services/sale-service';
import LogService from '../services/log-service';
import { HttpError } from '../config/error';
import { ISaleModel } from '../models/sale-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';

export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const sales: ISaleModel[] = await SaleService.findAll(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "sale"
        })
        res.json({
            status: 200,
            message: 'Get sales successfull',
            content: sales
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

export async function findOne(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const sale: ISaleModel = await SaleService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "sale"
        })
        res.json({
            status: 200,
            message: 'Get sale successfull',
            content: sale
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

export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const sale = await SaleService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "sale",
            detail_last: null,
            detail_new: JSON.stringify(json_object)
        });
        res.json({
            status: 200,
            message: 'Create sale successfull',
            message_reorder: sale.message??'',
            content: json_object
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

export async function update(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const {message,last_data,new_data} = await SaleService.update(parseInt(req.params.id),json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "update",
            catalog: "sale",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        });
        res.json({
            status: 200,
            message: 'Update sale successfull',
            message_reorder: message??''
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

export async function remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await SaleService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "sale",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            status: 200,
            message: 'Delete sale successfull',
            // content: new_data
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

export async function restore(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await SaleService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "sale",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            status: 200,
            message: 'Restore sale successfull',
            // content: new_data
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