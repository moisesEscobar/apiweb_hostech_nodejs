import PaymentOrderTxnService from '../services/payment-order-txn-service';
import LogService from '../services/log-service';
import { handleRouteError } from '../config/error';
import { IPaymentOrderTxnModel } from '../models/payment-order-txn-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import HandlerSucess from '../config/sucess';

export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const payment_order_txns: IPaymentOrderTxnModel[] = await PaymentOrderTxnService.findAll();
        await LogService.create({
            user_id: json_object_user.id,
            action: "findAll",
            catalog: "payment_order_txn"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','payment_order_txns'),
            content: payment_order_txns
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function findOne(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const payment_order_txn: IPaymentOrderTxnModel = await PaymentOrderTxnService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "payment_order_txn"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','payment_order_txn'),
            content: payment_order_txn
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const payment_order_txn: IPaymentOrderTxnModel = await PaymentOrderTxnService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "payment_order_txn",
            detail_last: null,
            detail_new: JSON.stringify(payment_order_txn)
        });
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_create','payment_order_txn'),
            content: payment_order_txn
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function update(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const {last_data,new_data} = await PaymentOrderTxnService.update(parseInt(req.params.id),json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "update",
            catalog: "payment_order_txn",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        });
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_update','payment_order_txn'),
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await PaymentOrderTxnService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "payment_order_txn",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_delete','payment_order_txn'),
            // content: new_data
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function restore(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await PaymentOrderTxnService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "payment_order_txn",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_restore','payment_order_txn'),
            // content: new_data
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}