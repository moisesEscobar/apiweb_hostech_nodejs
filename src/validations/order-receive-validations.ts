import * as Joi from 'joi';
import { IOrderReceiveCreateModel } from '../interfaces/order-receive-interface';

class OrderReceiveValidation {
    // supplier_customer_id ,total_amount / date_sale,updated_at,created_at
    createOrderReceive(params: IOrderReceiveCreateModel): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            date_order: Joi.date().optional().allow(''),
            customer_id: Joi.date().optional().allow(''),
            sales: Joi.array().items(Joi.object().keys({
                product_sale_id: Joi.number().required(),
                amount: Joi.number().required()
            })).min(1)
        });
        return schema.validate(params);
    }
    searchShopping(params: any): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            supplier_customer_id:  Joi.number().optional().min(1).allow(''),
            field_type: Joi.string().valid('total_amount').optional().allow(''),
            initial_value:  Joi.number().optional().allow(''),
            end_value:  Joi.number().optional().allow(''),
            type_date: Joi.string().valid('created_at', 'updated_at','date_order').optional().allow(''),
            init_date:  Joi.date().optional().allow(''),
            end_date:  Joi.date().optional().allow(''),
            page:  Joi.number().optional().min(1),
            page_size:  Joi.number().optional().min(1)
        });
        return schema.validate(params);
    } 

    validateId(
        body: {id: number}
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            id: Joi.number().required()
        });
        return schema.validate(body);
    }
}
export default new OrderReceiveValidation();