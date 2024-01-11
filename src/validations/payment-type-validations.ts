import * as Joi from 'joi';
import { IPaymentTypeModel } from '../models/payment-type-model';
import { errorJoiValidations } from '../config/error';

class PaymentTypeValidation {
    payment(
        params: IPaymentTypeModel
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().trim().empty().required().min(3).max(255)
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
    searchPaymentType(params: any): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().optional().allow(''),
            type_date: Joi.string().valid('created_at', 'updated_at').optional().allow(''),
            init_date:  Joi.date().optional().allow(''),
            end_date:  Joi.date().optional().allow(''),
            page:  Joi.number().optional().min(1),
            page_size:  Joi.number().optional().min(1)
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    } 
}
export default new PaymentTypeValidation();