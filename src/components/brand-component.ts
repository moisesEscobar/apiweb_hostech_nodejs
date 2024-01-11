import BrandService from '../services/brand-service';
import LogService from '../services/log-service';
import { handleRouteError } from '../config/error';
import { IBrandModel } from '../models/brand-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import HandlerSucess from '../config/sucess';

export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const brands: IBrandModel[] = await BrandService.findAll();
        await LogService.create({
            user_id: json_object_user.id,
            action: "findAll",
            catalog: "brand"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','brands'),
            content: brands
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}
export async function findAllWithProducts(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const brands: IBrandModel[] = await BrandService.findAllWithProducts();
        await LogService.create({
            user_id: json_object_user.id,
            action: "findAll",
            catalog: "brand"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('product_with_brand'),
            content: brands
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function findOne(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const brand: IBrandModel = await BrandService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "brand"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_get','brand'),
            content: brand
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function search(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const brands: IBrandModel[] = await BrandService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "brand"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_search','brands'),
            content: brands,
            //page: req.query.page,
            page_size: req.query.page_size,
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const brand: IBrandModel = await BrandService.create(json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "brand",
            detail_last: null,
            detail_new: JSON.stringify(brand)
        });
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_create','brand'),
            content: brand
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function update(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const {last_data,new_data} = await BrandService.update(parseInt(req.params.id),json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "update",
            catalog: "brand",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        });
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_update','brand'),
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function remove(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await BrandService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "brand",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_delete','brand'),
            //content: new_data
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}

export async function restore(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const {last_data,new_data} = await BrandService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "brand",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_restore','brand'),
            //content: new_data
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}