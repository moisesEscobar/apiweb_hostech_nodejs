import * as Joi from 'joi';
import { IShoppingInventoryModel } from 'src/interfaces/shopping-inventory-interface';

class ShoppingInventoryValidation {
    create(
        params: IShoppingInventoryModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            product_id: Joi.number().required(),
            quantity: Joi.number().required(),
            unit_price: Joi.number().optional()
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
export default new ShoppingInventoryValidation();