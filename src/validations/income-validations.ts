import * as Joi from 'joi';
import { IIncomeModel } from '../interfaces/income-interface';
import { errorJoiValidations } from '../config/error';

class IncomeValidation {
    createIncome(params: IIncomeModel): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            user_id: Joi.number().optional(),
            order_receive_id: Joi.number().optional(),
            account_id: Joi.number().required(),
            amount: Joi.number().optional().min(0)
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
    searcIncomesExpenses(
        params: any
    ): Joi.ValidationResult {
        // supplier_name type_user account_name type / order_id account_id supplier_customer_id / amount /  / date_order created_at updated_at
        let schema: Joi.Schema = Joi.object().keys({
            supplier_name:  Joi.string().optional().min(3).max(255).allow(''),
            type_user:  Joi.string().valid('supplier', 'customer').optional().min(3).max(255).allow(''),
            naccount_nameame:  Joi.string().optional().min(3).max(255).allow(''),
            type:  Joi.string().valid('income', 'expense').optional().min(3).max(255).allow(''),
            order_id:  Joi.number().optional().min(3).max(255).allow(''),
            account_id:  Joi.number().optional().min(3).max(255).allow(''),
            supplier_customer_id:  Joi.number().optional().min(3).max(255).allow(''),
            field_type: Joi.string().valid('amount').optional().allow(''),
            initial_value:  Joi.number().optional().allow(''),
            end_value:  Joi.number().optional().allow(''),
            type_date: Joi.string().valid('created_at', 'updated_at','date_order').optional().allow(''),
            init_date:  Joi.date().optional().allow(''),
            end_date:  Joi.date().optional().allow(''),
            page:  Joi.number().optional().min(1),
            page_size:  Joi.number().optional().min(1)
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
}
export default new IncomeValidation();