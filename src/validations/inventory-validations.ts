import * as Joi from 'joi';
import Inventory, { IInventoryModel } from '../models/inventory-model';

class InventoryValidation {
    inventory(
        params: IInventoryModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            product_id: Joi.number().required(),
            quantity: Joi.number().required()
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
export default new InventoryValidation();
