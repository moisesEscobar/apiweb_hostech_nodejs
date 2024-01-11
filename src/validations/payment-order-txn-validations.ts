import * as Joi from 'joi';
import  { IPaymentOrderTxnModel } from '../models/payment-order-txn-model';
import { errorJoiValidations } from '../config/error';

class PaymentOrderTxnValidation {
    createPaymentOrderTxn(
        params: IPaymentOrderTxnModel
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            status: Joi.string().valid(
                'pending', 'process','completed','failed','cancelled','refunded','verifying','rejected'
            ).required(),
            //amount: Joi.number().optional(),
            user_id: Joi.number().optional(),
            payment_type_id: Joi.number().required(),
            payment_order_id: Joi.number().required(),
            supplier_customer_id: Joi.number().required()
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
    updatePaymentOrderTxn(
        params: IPaymentOrderTxnModel
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            status: Joi.string().valid(
                'pending', 'process','completed','failed','cancelled','refunded','verifying','rejected'
            ).optional(),
            amount: Joi.number().optional(),
            user_id: Joi.number().optional(),
            payment_type_id: Joi.number().optional()
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
    validateId(
        body: {id: number}
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            id: Joi.number().required()
        });
        schema = errorJoiValidations(schema);
        return schema.validate(body);
    }
}
export default new PaymentOrderTxnValidation();