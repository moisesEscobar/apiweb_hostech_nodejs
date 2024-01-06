import * as Joi from 'joi';
import Brand, { IBrandModel } from '../models/brand-model';

class BrandValidation {
    brand(
        params: IBrandModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().required().min(3).max(255)
        });
        return schema.validate(params);
    }
    searchSupplier(
        params: IBrandModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().optional().min(3).max(255).allow(''),
            type_date: Joi.string().valid('created_at', 'updated_at').optional().allow(''),
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
export default new BrandValidation();