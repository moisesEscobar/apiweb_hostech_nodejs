import * as Joi from 'joi';
import { IShoppingInventoryCreateModel} from '../interfaces/shopping-inventory-interface';

class ShoppingInventoryValidation {
    create(
        params: IShoppingInventoryCreateModel
    ): Joi.ValidationResult {
        //{"date_purchase":"2023-12-01","supplier_id":1,"products":[{"product_id": 1, "quantity": 1}]}
        const schema: Joi.Schema = Joi.object().keys({
            date_purchase: Joi.date().optional().allow(''),
            //supplier_id: Joi.number().required(),
            products: Joi.array().items(Joi.object().keys({
                product_id: Joi.number().required(),
                quantity: Joi.number().required()
            })).min(1)
        });
        return schema.validate(params);
    }

    //supplier_customer_id, / quantity_products,total_amount_purchase, / date_purchase,created_at,updated_at


    searchShopping(params: any): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            supplier_customer_id:  Joi.number().optional().min(1).allow(''),
            field_type: Joi.string().valid('quantity_products', 'amount_payable','total_amount').optional().allow(''),
            initial_value:  Joi.number().optional().allow(''),
            end_value:  Joi.number().optional().allow(''),
            type_date: Joi.string().valid('created_at', 'updated_at','date_sale').optional().allow(''),
            init_date:  Joi.date().optional().allow(''),
            end_date:  Joi.date().optional().allow(''),
            page:  Joi.number().optional().min(1),
            page_size:  Joi.number().optional().min(1)
        });
        return schema.validate(params);
    } 
    validateId(body: {id: number}): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            id: Joi.number().required()
        });
        return schema.validate(body);
    }
}
export default new ShoppingInventoryValidation();