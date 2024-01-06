import ShoppingInventoryService from '../services/shopping-inventory-service';
import LogService from '../services/log-service';
import { HttpError } from '../config/error';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import { IShoppingInventoryModel } from '../interfaces/shopping-inventory-interface';

export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const shoppings: IShoppingInventoryModel[] = await ShoppingInventoryService.findAll();
        await LogService.create({
            user_id: json_object_user.id,
            action: "findAll",
            catalog: "shopping_inventory"
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
export async function search(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const inventories: IShoppingInventoryModel[] = await ShoppingInventoryService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "shopping_inventory"
        })
        res.json({
            status: 200,
            message: 'Get shoppings successfull',
            content: inventories
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
        const inventory: IShoppingInventoryModel = await ShoppingInventoryService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "shopping_inventory"
        })
        res.json({
            status: 200,
            message: 'Get shopping successfull',
            content: inventory
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
        await ShoppingInventoryService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "shopping_inventory",
            detail_last: null,
            detail_new: JSON.stringify(json_object)
        });
        res.json({
            status: 200,
            message: 'Create shopping and inventory successfull',
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