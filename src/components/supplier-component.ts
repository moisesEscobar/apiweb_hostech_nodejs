import SupplierService from '../services/supplier-service';
import LogService from '../services/log-service';
import { handleRouteError } from '../config/error';
import { ISupplierModel } from '../models/supplier-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import HandlerSucess from '../config/sucess';

export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const suppliers: ISupplierModel[] = await SupplierService.findAll();
        await LogService.create({
            user_id: json_object_user.id,
            action: "findAll",
            catalog: "supplier"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','suppliers'),
            content: suppliers
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}


export async function summaryShopings(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const suppliers: ISupplierModel[] = await    SupplierService.summaryShopings(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "supplier"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_search','suppliers'),
            content: suppliers,
            //page: req.query.page,
            page_size: req.query.page_size,
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}


export async function search(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const suppliers: ISupplierModel[] = await    SupplierService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "supplier"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_search','suppliers'),
            content: suppliers,
            //page: req.query.page,
            page_size: req.query.page_size,
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function findOne(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const supplier: ISupplierModel = await SupplierService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "supplier"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','supplier'),
            content: supplier
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const supplier: ISupplierModel = await SupplierService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "supplier",
            detail_last: null,
            detail_new: JSON.stringify(supplier)
        });
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_create','supplier'),
            content: supplier
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function update(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const {last_data,new_data} = await SupplierService.update(parseInt(req.params.id),json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "update",
            catalog: "supplier",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        });
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_update','supplier'),
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await SupplierService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "supplier",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_delete','supplier'),
            // content: new_data
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function restore(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await SupplierService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "supplier",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_restore','supplier'),
            // content: new_data
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}