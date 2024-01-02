import * as Joi from 'joi';
import Sale, { ISaleModel } from '../models/sale-model';

class SaleValidation {
    sale(
        params: ISaleModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            product_id: Joi.number().required(),
            quantity: Joi.number().required(),
            total_amount: Joi.number().optional()
        });
        return schema.validate(params);
    }
    updateSale(
        params: ISaleModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            quantity: Joi.number().required(),
            total_amount: Joi.number().optional()
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
export default new SaleValidation();