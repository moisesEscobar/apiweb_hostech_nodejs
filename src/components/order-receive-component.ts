import OrderReceiveService from '../services/order-receive-service';
import LogService from '../services/log-service';
import { handleRouteError } from '../config/error';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import { IOrderReceiveModel } from '../interfaces/order-receive-interface';
import HandlerSucess from '../config/sucess';

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
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_search','orders_receive'),
            content: orders_receive
        });
    } catch (error) {
        handleRouteError(error, res, next);
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
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','order_receive'),
            content: orders_receive
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}
export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        json_object.user_id = json_object_user.id;
        await OrderReceiveService.create(json_object);
        /* await LogService.create({
            user_id: json_object_user.id,action: "create",catalog: "order_receive",
            detail_last: null,detail_new: JSON.stringify(json_object)
        }); */
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_create','order_receive'),
            content: json_object
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}