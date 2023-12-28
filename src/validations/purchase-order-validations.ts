import * as Joi from 'joi';
import { IPurchaseOrderModel } from '../models/purchase-order-model';

class PurchaseOrderTxnValidation {
    purchaseOrder(
        params: IPurchaseOrderModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            shopping_id: Joi.number().required(),
            payment_order_id: Joi.date().required()
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
export default new PurchaseOrderTxnValidation();