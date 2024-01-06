import OrderReceiveService from '../services/order-receive-service';
import LogService from '../services/log-service';
import { HttpError } from '../config/error';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import { IOrderReceiveModel } from '../interfaces/order-receive-interface';

export async function search(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const orders_receive: IOrderReceiveModel[] = await OrderReceiveService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "order_receive"
        })
        res.json({
            status: 200,
            message: 'Get orders receive successfull',
            content: orders_receive
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
        const orders_receive: IOrderReceiveModel = await OrderReceiveService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "order_receive"
        })
        res.json({
            status: 200,
            message: 'Get order receive successfull',
            content: orders_receive
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
        await OrderReceiveService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "order_receive",
            detail_last: null,
            detail_new: JSON.stringify(json_object)
        });
        res.json({
            status: 200,
            message: 'Create order receive successfull',
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