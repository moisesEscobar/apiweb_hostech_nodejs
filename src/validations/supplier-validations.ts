import * as Joi from 'joi';
import Supplier, { ISupplierModel } from '../models/supplier-model';

class SupplierValidation {
    supplier(
        params: ISupplierModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().required().min(3).max(255)
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
export default new SupplierValidation();