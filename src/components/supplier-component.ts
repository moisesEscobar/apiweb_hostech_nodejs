import SupplierService from '../services/supplier-service';
import LogService from '../services/log-service';
import { HttpError } from '../config/error';
import { ISupplierModel } from '../models/supplier-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';

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
            status: 200,
            message: 'Get suppliers successfull',
            content: suppliers
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
            status: 200,
            message: 'Searchs suppliers successfull',
            content: suppliers,
            //page: req.query.page,
            page_size: req.query.page_size,
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
        const suppliers: ISupplierModel[] = await    SupplierService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "supplier"
        })
        res.json({
            status: 200,
            message: 'Searchs suppliers successfull',
            content: suppliers,
            //page: req.query.page,
            page_size: req.query.page_size,
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
        const supplier: ISupplierModel = await SupplierService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "supplier"
        })
        res.json({
            status: 200,
            message: 'Get supplier successfull',
            content: supplier
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
        const supplier: ISupplierModel = await SupplierService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "supplier",
            detail_last: null,
            detail_new: JSON.stringify(supplier)
        });
        res.json({
            status: 200,
            message: 'Create supplier successfull',
            content: supplier
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
        const {last_data,new_data} = await SupplierService.update(parseInt(req.params.id),json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "update",
            catalog: "supplier",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        });
        res.json({
            status: 200,
            message: 'Update supplier successfull'
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
        const {last_data,new_data} = await SupplierService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "supplier",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            status: 200,
            message: 'Delete supplier successfull',
            // content: new_data
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
        const {last_data,new_data} = await SupplierService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "supplier",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            status: 200,
            message: 'Restore supplier successfull',
            // content: new_data
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