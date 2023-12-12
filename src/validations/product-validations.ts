import * as Joi from 'joi';
import { IProductModel } from '../models/product-model';
import Brand from '../models/brand-model';

class ProductValidation {
    async product(params: IProductModel) {
        const schema = Joi.object({
            name: Joi.string().required(),
            key: Joi.string().required(),
            brand_id: Joi.number().integer().positive().required().custom(async (value, helpers) => {
                const brandExist = await Brand.findByPk(value);
                if (!brandExist) {
                    return helpers.error('any.invalid', { message: 'The brand does not exist' });
                }
                return value;
            }).messages({ 'any.invalid': '{{#message}}' }),
        });
        return await schema.validateAsync(params);
    }
    /* 
    product(
        params: IProductModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            key: Joi.string().required(),
        });
        return schema.validate(params);
    } */
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
