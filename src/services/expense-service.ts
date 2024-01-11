import * as Joi from 'joi';
import ExpenseValidation from '../validations/expense-validations';
import { IExpenseModel,IExpenseService } from '../interfaces/expense-interface';
import sequelize from '../config/connection/connection';
import { ErrorRate } from '../config/error';

const ExpenseService: IExpenseService = {
    async create(body: IExpenseModel): Promise < void > {
        try {
            const validate: Joi.ValidationResult = await ExpenseValidation.createExpense(body);
            if(validate.error) throw new ErrorRate(validate.error.message,3);
            const {payment_order_id=null,account_id,amount=null,user_id} = body;
            await sequelize.query('CALL create_expenses(:user_id,:payment_order_id,:account_id,:amount)', {
                replacements: {user_id,payment_order_id,account_id,amount },
            });
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
};

export default ExpenseService;
