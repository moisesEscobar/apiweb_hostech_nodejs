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
    searchInventory(params: any): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            product_id:  Joi.number().optional().min(1).allow(''),
            supplier_customer_id:  Joi.number().optional().min(1).allow(''),
            brand_id:  Joi.number().optional().min(1).allow(''),
            product_sku:  Joi.string().optional().allow(''),
            field_type: Joi.string().valid('product_price', 'product_reorder_point','quantity_sold','total_quantity','quantity_available','total_amount_sold').optional().allow(''),
            initial_value:  Joi.number().optional().allow(''),
            end_value:  Joi.number().optional().allow(''),
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
export default new InventoryValidation();
