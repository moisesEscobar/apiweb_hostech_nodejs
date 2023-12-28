import * as Joi from 'joi';
import  { IShoppingModel } from '../models/shopping-model';

class ShoppingValidation {
    Shopping(
        params: IShoppingModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().required().min(3).max(255)
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
export default new ShoppingValidation();