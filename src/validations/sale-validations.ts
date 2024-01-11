import * as Joi from 'joi';
import { ISaleModel } from '../models/sale-model';
import { ISaleCreateModel } from '../interfaces/sale-interface';
import { errorJoiValidations } from '../config/error';

class SaleValidation {
    createSale(
        params: ISaleCreateModel
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            user_id: Joi.number().optional(),
            date_sale: Joi.date().optional().allow(''),
            customer_id: Joi.number().optional().required(),
            products: Joi.array().items(Joi.object().keys({
                product_id: Joi.number().required(),
                quantity: Joi.number().required()
            })).min(1)
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
    sale(
        params: ISaleModel
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            product_id: Joi.number().required(),
            quantity: Joi.number().required(),
            total_amount: Joi.number().optional()
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
    updateSale(
        params: ISaleModel
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            quantity: Joi.number().required(),
            total_amount: Joi.number().optional()
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
    validateId(
        body: {id: number}
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            id: Joi.number().required()
        });
        schema = errorJoiValidations(schema);
        return schema.validate(body);
    }
    searchSale(params: any): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            supplier_customer_id:  Joi.number().optional().min(1).allow(''),
            field_type: Joi.string().valid('quantity_products', 'total_amount_purchase','amount_payable').optional().allow(''),
            initial_value:  Joi.number().optional().allow(''),
            end_value:  Joi.number().optional().allow(''),
            type_date: Joi.string().valid('created_at', 'updated_at','date_purchase').optional().allow(''),
            init_date:  Joi.date().optional().allow(''),
            end_date:  Joi.date().optional().allow(''),
            page:  Joi.number().optional().min(1),
            page_size:  Joi.number().optional().min(1)
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    } 
}
export default new SaleValidation();