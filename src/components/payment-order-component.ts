import PaymentOrderService from '../services/payment-order-service';
import LogService from '../services/log-service';
import { handleRouteError } from '../config/error';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import { IPaymentOrderModel } from '../interfaces/payment-order-interface';
import HandlerSucess from '../config/sucess';

export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const payment_orders: IPaymentOrderModel[] = await PaymentOrderService.findAll(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "payment_order_purchase"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','payment_order_purchases'),
            content: payment_orders
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function findOne(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const payment_order: IPaymentOrderModel = await PaymentOrderService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "payment_order_purchase"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','payment_order_purchase'),
            content: payment_order
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
        await PaymentOrderService.create(json_object);
        /* await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "payment_order_purchase",
            detail_last: null,
            detail_new: JSON.stringify(json_object)
        }); */
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_create','payment_order_purchase'),
            content: json_object
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function update(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const {last_data,new_data} = await PaymentOrderService.update(parseInt(req.params.id),json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "update",
            catalog: "payment_order_purchase",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        });
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_update','payment_order_purchase'),
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await PaymentOrderService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "payment_order_purchase",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_delete','payment_order_purchase'),
            content: new_data
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function restore(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await PaymentOrderService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "payment_order_purchase",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_restore','payment_order_purchase'),
            content: new_data
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}