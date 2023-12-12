import * as Joi from 'joi';
import { IBrandModel } from '../models/brand-model';

class BrandValidation {
    brand(
        params: IBrandModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required()
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