import * as Joi from 'joi';
import { IPaymentOrderModel } from 'src/interfaces/payment-order-interface';

class PaymentOrderValidation {
    paymentOrder(
        params: IPaymentOrderModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            shopping_id: Joi.number().required(),
            payment_date: Joi.date().optional(),
            status: Joi.string().valid(
                'pending', 'process','completed','failed','cancelled','refunded','verifying','rejected'
            ).required()
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
export default new PaymentOrderValidation();