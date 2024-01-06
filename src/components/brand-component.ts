import BrandService from '../services/brand-service';
import LogService from '../services/log-service';
import { HttpError } from '../config/error';
import { IBrandModel } from '../models/brand-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';

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
            status: 200,
            message: 'Get brands successfull',
            content: brands
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
            status: 200,
            message: 'Get brands with products successfull',
            content: brands
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
        const brand: IBrandModel = await BrandService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "findOne",
            catalog: "brand"
        })
        res.json({
            status: 200,
            message: 'Get brand successfull',
            content: brand
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
        const brands: IBrandModel[] = await BrandService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "brand"
        })
        res.json({
            status: 200,
            message: 'Searchs brands successfull',
            content: brands,
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
            status: 200,
            message: 'Create brand successfull',
            content: brand
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
        const {last_data,new_data} = await BrandService.update(parseInt(req.params.id),json_object);
        await LogService.create({
            user_id: json_object_user.id,
            action: "update",
            catalog: "brand",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        });
        res.json({
            status: 200,
            message: 'Update brand successfull'
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
        const {last_data,new_data} = await BrandService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "remove",
            catalog: "brand",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            status: 200,
            message: 'Delete brand successfull',
            //content: new_data
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
        const {last_data,new_data} = await BrandService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: json_object_user.id,
            action: "restore",
            catalog: "brand",
            detail_last: JSON.stringify(last_data),
            detail_new: JSON.stringify(new_data)
        })
        res.json({
            status: 200,
            message: 'Restore brand successfull',
            //content: new_data
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