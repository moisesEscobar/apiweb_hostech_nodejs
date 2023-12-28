import * as Joi from 'joi';
import { IProductModel } from '../models/product-model';
import Brand from '../models/brand-model';

class ProductValidation {
    async createProduct(params: IProductModel) {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().optional(),
            sku: Joi.string().required(),
            price: Joi.number().positive().optional(),
            reorder_point: Joi.number().positive().optional(),
            brand_id: Joi.number().integer().positive().required(),
            supplier_customer_id: Joi.number().integer().positive().required()
        });
        return await schema.validateAsync(params);
    }
    async updateProduct(params: IProductModel) {
        const schema = Joi.object({
            description: Joi.string().optional(),
            price: Joi.number().positive().optional(),
            reorder_point: Joi.number().positive().optional()
        });
        return await schema.validateAsync(params);
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

export default new ProductValidation();
