import * as Joi from 'joi';
import { IPaymentOrderCreateModel, IPaymentOrderModel } from '../interfaces/payment-order-interface';

class PaymentOrderValidation {
    updatePaymentOrder( params: IPaymentOrderModel): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            shopping_id: Joi.number().required(),
            payment_date: Joi.date().optional(),
            status: Joi.string().valid(
                'pending', 'process','completed','failed','cancelled','refunded','verifying','rejected'
            ).required()
        });
        return schema.validate(params);
    }
    createPaymentOrder(params: IPaymentOrderCreateModel): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            payment_date: Joi.date().optional().allow(''),
            status: Joi.string().valid(
                'pending', 'process','completed','failed','cancelled','refunded','verifying','rejected'
            ).required(),
            //supplier_id: Joi.number().required(),
            shoppings: Joi.array().items(Joi.object().keys({
                shopping_id: Joi.number().required(),
                amount: Joi.number().required()
            })).min(1)
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
    searchPaymentOrder(params: any): Joi.ValidationResult {
        //status / total_amount, payment_date, updated_at, created_at,
        const schema: Joi.Schema = Joi.object().keys({
            field_type: Joi.string().valid('total_amount').optional().allow(''),
            initial_value:  Joi.number().optional().allow(''),
            end_value:  Joi.number().optional().allow(''),
            type_date: Joi.string().valid('created_at', 'updated_at','payment_date').optional().allow(''),
            init_date:  Joi.date().optional().allow(''),
            end_date:  Joi.date().optional().allow(''),
            page:  Joi.number().optional().min(1),
            page_size:  Joi.number().optional().min(1)
        });
        return schema.validate(params);
    } 
}
export default new PaymentOrderValidation();