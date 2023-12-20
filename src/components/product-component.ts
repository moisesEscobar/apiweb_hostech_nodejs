import ProductService from '../services/product-service';
import { HttpError } from '../config/error';
import { IProductModel } from '../models/product-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import LogService from '../services/log-service';


export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const products: IProductModel[] = await ProductService.findAll();
        await LogService.create({
            user_id: json_object_user.id,
            action: "findAll",
            catalog: "brand"
        })
        res.json({
            status: 200,
            message: 'Get products successfull',
            content: products
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
        const product: IProductModel = await ProductService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "brand"
        })
        res.json({
            status: 200,
            message: 'Get product successfull',
            content: product
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
        const products: IProductModel[] = await ProductService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "brand"
        })

        
        res.json({
            status: 200,
            message: 'Searchs product successfull',
            content: products,
            page: req.query.page,
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

export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const product: IProductModel = await ProductService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "ceate",
            catalog: "brand",
            detail_last: null,
            detail_new: JSON.stringify(product)
        })
        res.json({
            status: 200,
            message: 'Create product successfull',
            content: product
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
        const {last_data,new_data} = await ProductService.update(parseInt(req.params.id),json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "update",
            catalog: "brand",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            status: 200,
            message: 'Update product successfull'
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
        const product: IProductModel = await ProductService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "brand"
        })
        res.json({
            status: 200,
            message: 'Delete product successfull'
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
        const product: IProductModel = await ProductService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "brand"
        })
        res.json({
            status: 200,
            message: '  Restore product successfull',
            content: product
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