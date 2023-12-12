import BrandService from '../services/brand-service';
import LogService from '../services/log-service';
import { HttpError } from '../config/error';
import { IBrandModel } from '../models/brand-model';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';

export async function findAll(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const jsonObjectUs: any = req.user;
        const brands: IBrandModel[] = await BrandService.findAll();
        await LogService.create({
            user_id: jsonObjectUs.id,
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

export async function findOne(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const jsonObjectUs: any = req.user;
        const brand: IBrandModel = await BrandService.findOne(parseInt(req.params.id));
        await LogService.create({
            user_id: jsonObjectUs.id,
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
        const jsonObjectUs: any = req.user;
        const brands: IBrandModel[] = await BrandService.search(req.query);
        await LogService.create({
            user_id: jsonObjectUs.id,
            action: "search",
            catalog: "brand"
        })
        res.json({
            status: 200,
            message: 'Searchs brands successfull',
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

export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const jsonObjectUs: any = req.user;
        let jsonObject: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        const brand: IBrandModel = await BrandService.create(jsonObject);
        await LogService.create({
            user_id: jsonObjectUs.id,
            action: "ceate",
            catalog: "brand"
        })
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
        const jsonObjectUs: any = req.user;
        let jsonObject: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        await BrandService.update(parseInt(req.params.id),jsonObject);
        await LogService.create({
            user_id: jsonObjectUs.id,
            action: "update",
            catalog: "brand"
        })
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
        const jsonObjectUs: any = req.user;
        const brand: IBrandModel = await BrandService.remove(parseInt(req.params.id));
        await LogService.create({
            user_id: jsonObjectUs.id,
            action: "remove",
            catalog: "brand"
        })
        res.json({
            status: 200,
            message: 'Delete brand successfull',
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

export async function restore(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const jsonObjectUs: any = req.user;
        const brand: IBrandModel = await BrandService.restore(parseInt(req.params.id));
        await LogService.create({
            user_id: jsonObjectUs.id,
            action: "restore",
            catalog: "brand"
        })
        res.json({
            status: 200,
            message: 'Restore brand successfull',
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