import * as Joi from 'joi';
import { IProductModel } from '../models/product-model';
import { errorJoiValidations } from '../config/error';

class ProductValidation {
    async createProduct(params: IProductModel) {
        let schema: Joi.Schema = Joi.object({
            name: Joi.string().required(),
            path_file: Joi.string().optional(),
            description: Joi.string().allow('').optional(),
            sku: Joi.string().required(),
            price: Joi.number().positive().optional(),
            reorder_point: Joi.number().positive().optional(),
            brand_id: Joi.number().integer().positive().required(),
            supplier_customer_id: Joi.number().integer().positive().required()
        });
        schema = errorJoiValidations(schema);
        return await schema.validateAsync(params);
    }
    searchSupplier(params: IProductModel): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().optional().min(3).max(255).allow(''),
            sku:  Joi.string().optional().allow(''),
            brand_id:  Joi.number().optional().min(1).allow(''),
            supplier_customer_id:  Joi.number().optional().min(1).allow(''),
            type_date: Joi.string().valid('created_at', 'updated_at').optional().allow(''),
            init_date:  Joi.date().optional().allow(''),
            end_date:  Joi.date().optional().allow(''),
            page:  Joi.number().optional().min(1),
            page_size:  Joi.number().optional().min(1)
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }    
    async updateProduct(params: IProductModel) {
        let schema: Joi.Schema = Joi.object({
            name: Joi.string().optional(),
            description: Joi.string().allow('').optional(),
            sku: Joi.string().optional(),
            price: Joi.number().positive().optional(),
            reorder_point: Joi.number().positive().optional(),
            brand_id: Joi.number().integer().positive().optional(),
            supplier_customer_id: Joi.number().integer().positive().optional()
        });
        schema = errorJoiValidations(schema);
        return await schema.validateAsync(params);
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
}

export default new ProductValidation();
