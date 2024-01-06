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

    //name, phone_number, address / total_products/total_amount_purchase,total_amount_paid,amount_payable / created_at,updated_at
    //total_products/total_amount_purchase,total_amount_paid,amount_payable
    searchSupplierSummary(
        params: ISupplierModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
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
        return schema.validate(params);
    }
    searchSupplier(
        params: ISupplierModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
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
        return schema.validate(params);
    }
    updateSupplier(
        params: ISupplierModel
    ): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            name:  Joi.string().optional().min(3).max(255),
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