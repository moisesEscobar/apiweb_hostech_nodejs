import ShoppingInventoryService from '../services/shopping-inventory-service';
import LogService from '../services/log-service';
import { handleRouteError } from '../config/error';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import { IShoppingInventoryModel } from '../interfaces/shopping-inventory-interface';
import HandlerSucess from '../config/sucess';

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
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','shoppings'),
            content: shoppings
        });
    } catch (error) {
        handleRouteError(error, res, next);
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
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_search','shoppings'),
            content: inventories
        });
    } catch (error) {
        handleRouteError(error, res, next);
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
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','shopping'),
            content: inventory
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
        await ShoppingInventoryService.create(json_object);

        /* await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "shopping_inventory",
            detail_last: null,
            detail_new: JSON.stringify(json_object)
        }); */
        
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_create','shopping'),
            content: json_object
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}