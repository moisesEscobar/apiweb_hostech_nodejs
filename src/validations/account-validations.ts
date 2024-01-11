import * as Joi from 'joi';
import { IAccountModel } from '../interfaces/account-interface';
import { errorJoiValidations } from '../config/error';

class AccountValidation {
    updateAccount( params: IAccountModel): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            account_name: Joi.string().trim().empty().optional(),
            initial_balance: Joi.number().optional().min(0)
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
    createAccount(params: IAccountModel): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            account_name: Joi.string().trim().empty().required(),
            initial_balance: Joi.number().optional().min(0)
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
    searchAccount(params: any): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            account_name:  Joi.string().optional().allow(''),
            field_type: Joi.string().valid('initial_balance').optional().allow(''),
            initial_value:  Joi.number().optional().allow(''),
            end_value:  Joi.number().optional().allow(''),
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
export default new AccountValidation();