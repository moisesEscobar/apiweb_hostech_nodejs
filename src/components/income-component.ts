import IncomeService from '../services/income-service';
import LogService from '../services/log-service';
import { handleRouteError } from '../config/error';
import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../interfaces/request';
import HandlerSucess from '../config/sucess';

export async function create(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        let json_object: any = req.body.json ? JSON.parse(req.body.json) : req.body;
        json_object.user_id = json_object_user.id;
        await IncomeService.create(json_object);
        /* await LogService.create({
            user_id: json_object_user.id,
            action: "create",
            catalog: "income",
            detail_last: null,
            detail_new: JSON.stringify(json_object)
        }); */
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_create','income'),
            content: json_object
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}
export async function search(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const json_object_user: any = req.user;
        const brands: any[] = await IncomeService.search(req.query);
        await LogService.create({
            user_id: json_object_user.id,
            action: "search",
            catalog: "brand"
        })
        res.json({
            sub_code: 200,
            message: HandlerSucess.getSuccessMessage('records_search','incomes_expenses'),
            content: brands,
            page_size: req.query.page_size,
        });
    } catch (error) {
        handleRouteError(error, res, next);
    }
}