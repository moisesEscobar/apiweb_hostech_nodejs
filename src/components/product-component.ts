import ProductService from '../services/product-service';
import { ErrorRate, handleRouteError } from '../config/error';
import { IProductModel } from '../models/product-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import LogService from '../services/log-service';
import HandlerSucess from '../config/sucess';

export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const products: IProductModel[] = await ProductService.findAll();
        await LogService.create({
            user_id: json_object_user.id,
            action: "findAll",
            catalog: "product"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','products'),
            content: products
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function reportResume(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const products: IProductModel[] = await ProductService.reportResume();
        await LogService.create({
            user_id: json_object_user.id,
            action: "reportResume",
            catalog: "product"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','products'),
            content: products
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}


export async function findOne(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const product: IProductModel = await ProductService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "product"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','product'),
            content: product
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function search(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const products: IProductModel[] = await ProductService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "product"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_search','products'),
            content: products,
            //page: req.query.page,
            page_size: req.query.page_size,
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function create(req, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        if (req.file) {
            if(!['image/jpeg', 'image/png'].includes(req.file.mimetype)){
                throw new ErrorRate("format_not_allowed");
            }
            json_object.path_file = 'storage/'+ req.file.filename
        }
        const product: IProductModel = await ProductService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "ceate",
            catalog: "product",
            detail_last: null,
            detail_new: JSON.stringify(product)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_create','product'),
            content: product
        });
        
    } catch (error) {
        handleRouteError(error, res, next);
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
            catalog: "product",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_update','product'),
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const product: IProductModel = await ProductService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "product"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_delete','product'),
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function restore(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const product: IProductModel = await ProductService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "product"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_restore','product'),
            //content: product
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}