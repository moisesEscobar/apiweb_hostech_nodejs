import PaymentTypeService from '../services/payment-type-service';
import LogService from '../services/log-service';
import { handleRouteError } from '../config/error';
import { IPaymentTypeModel } from '../models/payment-type-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import HandlerSucess from '../config/sucess';

export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const payment_types: IPaymentTypeModel[] = await PaymentTypeService.findAll(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "payment_type"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','payment_types'),
            content: payment_types
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}
export async function findOne(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const payment_type: IPaymentTypeModel = await PaymentTypeService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "payment_type"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','payment_type'),
            content: payment_type
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const payment_type: IPaymentTypeModel = await PaymentTypeService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "payment_type",
            detail_last: null,
            detail_new: JSON.stringify(payment_type)
        });
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_create','payment_type'),
            content: payment_type
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function update(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const {last_data,new_data} = await PaymentTypeService.update(parseInt(req.params.id),json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "update",
            catalog: "payment_type",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        });
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_update','payment_type'),
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await PaymentTypeService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "payment_type",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_delete','payment_type'),
            // content: new_data
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function restore(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await PaymentTypeService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "payment_type",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_restore','payment_type'),
            // content: new_data
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}