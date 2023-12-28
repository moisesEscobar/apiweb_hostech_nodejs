import * as Joi from 'joi';
import  { IPaymentOrderTxnModel } from '../models/payment-order-txn-model';

class PaymentOrderTxnValidation {
    createPaymentOrderTxn(
        params: IPaymentOrderTxnModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            status: Joi.string().valid(
                'pending', 'process','completed','failed','cancelled','refunded','verifying','rejected'
            ).required(),
            amount: Joi.number().optional(),
            user_id: Joi.number().optional(),
            payment_type_id: Joi.number().required(),
            payment_order_id: Joi.number().required(),
            supplier_customer_id: Joi.number().required()
        });
        return schema.validate(params);
    }
    updatePaymentOrderTxn(
        params: IPaymentOrderTxnModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            status: Joi.string().valid(
                'pending', 'process','completed','failed','cancelled','refunded','verifying','rejected'
            ).optional(),
            amount: Joi.number().optional(),
            user_id: Joi.number().optional(),
            payment_type_id: Joi.number().optional()
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
export default new PaymentOrderTxnValidation();