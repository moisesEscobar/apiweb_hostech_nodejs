import InventoryService from '../services/inventory-service';
import LogService from '../services/log-service';
import { handleRouteError } from '../config/error';
import { IInventoryModel } from '../models/inventory-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import HandlerSucess from '../config/sucess';

export async function search(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const inventories: IInventoryModel[] = await InventoryService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "inventory"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_search','inventories'),
            content: inventories
        });
    } catch (error) {
        handleRouteError(error, res, next);
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
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','inventory'),
            content: inventory
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}
