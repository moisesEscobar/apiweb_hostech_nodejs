import * as Joi from 'joi';
import { IExpenseModel } from '../interfaces/expense-interface';
import { errorJoiValidations } from '../config/error';

class ExpenseValidation {
    createExpense(params: IExpenseModel): Joi.ValidationResult {
        let schema: Joi.Schema = Joi.object().keys({
            user_id: Joi.number().optional(),
            payment_order_id: Joi.number().optional(),
            account_id: Joi.number().required(),
            amount: Joi.number().optional().min(0)
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
}
export default new ExpenseValidation();
