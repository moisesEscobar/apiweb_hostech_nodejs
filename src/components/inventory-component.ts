import InventoryService from '../services/inventory-service';
import LogService from '../services/log-service';
import { HttpError } from '../config/error';
import { IInventoryModel } from '../models/inventory-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';

export async function search(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const inventories: IInventoryModel[] = await InventoryService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "findAll",
            catalog: "inventory"
        })
        res.json({
            status: 200,
            message: 'Get inventories successfull',
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
        const inventory: IInventoryModel = await InventoryService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "inventory"
        })
        res.json({
            status: 200,
            message: 'Get inventory successfull',
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
