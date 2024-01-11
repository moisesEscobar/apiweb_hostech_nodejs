import * as Joi from 'joi';
import { ISupplierModel } from '../models/supplier-model';
import { errorJoiValidations } from '../config/error';

class SupplierValidation {
    createSupplier(
        params: ISupplierModel
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().required().min(3).max(255),
            phone_number:  Joi.string().optional().min(10).max(15),
            address:  Joi.string().optional(),
            type_user: Joi.string().valid('supplier','customer').required()
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }

    searchSupplierSummary(
        params: ISupplierModel
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().optional().min(3).max(255).allow(''),
            address:  Joi.string().optional().allow(''),
            phone_number:  Joi.string().optional().min(3).max(15).allow(''),
            field_type: Joi.string().valid('total_products', 'total_amount_purchase','total_amount_paid','amount_payable').optional().allow(''),
            initial_value:  Joi.number().optional().allow(''),
            end_value:  Joi.number().optional().allow(''),
            type_user: Joi.string().valid('supplier','customer').required(),
            type_date: Joi.string().valid('created_at', 'updated_at').optional().allow(''),
            init_date:  Joi.date().optional().allow(''),
            end_date:  Joi.date().optional().allow(''),
            page:  Joi.number().optional().min(1),
            page_size:  Joi.number().optional().min(1)
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
    searchSupplier(
        params: ISupplierModel
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().optional().min(3).max(255).allow(''),
            address:  Joi.string().optional().allow(''),
            phone_number:  Joi.string().optional().min(3).max(15).allow(''),
            type_user: Joi.string().valid('supplier','customer').optional().allow(''),
            type_date: Joi.string().valid('created_at', 'updated_at').optional().allow(''),
            init_date:  Joi.date().optional().allow(''),
            end_date:  Joi.date().optional().allow(''),
            page:  Joi.number().optional().min(1),
            page_size:  Joi.number().optional().min(1)
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
    updateSupplier(
        params: ISupplierModel
    ): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().optional().min(3).max(255),
            phone_number:  Joi.string().optional().min(10).max(15),
            address:  Joi.string().optional()
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
export default new SupplierValidation();