import * as Joi from 'joi';
import Supplier, { ISupplierModel } from '../models/supplier-model';

class SupplierValidation {
    createSupplier(
        params: ISupplierModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().required().min(3).max(255),
            phone_number:  Joi.string().optional().min(10).max(15),
            address:  Joi.string().optional(),
            type_user: Joi.string().valid('supplier','customer').required()
        });
        return schema.validate(params);
    }
    updateSupplier(
        params: ISupplierModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().required().min(3).max(255),
            phone_number:  Joi.string().optional().min(10).max(15),
            address:  Joi.string().optional()
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