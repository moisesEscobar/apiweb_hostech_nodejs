import ShoppingService from '../services/shopping-service';
import LogService from '../services/log-service';
import { HttpError } from '../config/error';
import { IShoppingModel } from '../models/shopping-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';

export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const shoppings: IShoppingModel[] = await ShoppingService.findAll();
        await LogService.create({
            user_id: json_object_user.id,
            action: "findAll",
            catalog: "shopping"
        })
        res.json({
            status: 200,
            message: 'Get shoppings successfull',
            content: shoppings
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
        const shopping: IShoppingModel = await ShoppingService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "shopping"
        })
        res.json({
            status: 200,
            message: 'Get shopping successfull',
            content: shopping
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
        const shopping: IShoppingModel = await ShoppingService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "shopping",
            detail_last: null,
            detail_new: JSON.stringify(shopping)
        });
        res.json({
            status: 200,
            message: 'Create shopping successfull',
            content: shopping
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
        const {last_data,new_data} = await ShoppingService.update(parseInt(req.params.id),json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "update",
            catalog: "shopping",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        });
        res.json({
            status: 200,
            message: 'Update shopping successfull'
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
        const {last_data,new_data} = await ShoppingService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "shopping",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            status: 200,
            message: 'Delete shopping successfull',
            content: new_data
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
        const {last_data,new_data} = await ShoppingService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "shopping",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            status: 200,
            message: 'Restore shopping successfull',
            content: new_data
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