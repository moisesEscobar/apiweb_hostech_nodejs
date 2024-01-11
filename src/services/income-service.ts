import * as Joi from 'joi';
import IncomeValidation from '../validations/income-validations';
import { IIncomeModel,IIncomeService } from '../interfaces/income-interface';
import sequelize from '../config/connection/connection';
import { ErrorRate } from '../config/error';
import Utils from '../utils/validate-data-utils';
import { Op } from 'sequelize';
import IncomesExpensesSummaryView from '../models/views/incomes-expenses-summary-view';

const IncomeService: IIncomeService = {
    async create(body: IIncomeModel): Promise < void > {
        try {
            const validate: Joi.ValidationResult = await IncomeValidation.createIncome(body);
            if(validate.error) throw new ErrorRate(validate.error.message,3);
            const {order_receive_id=null,account_id,amount=null,user_id} = body;
            await sequelize.query('CALL create_incomes(:user_id,:order_receive_id,:account_id,:amount)', {
                replacements: {user_id,order_receive_id,account_id,amount },
            });
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async search(params: any): Promise < any[] > {
        try {

            const validate: Joi.ValidationResult = await IncomeValidation.searcIncomesExpenses(params);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldsParams('supplier_name',params['supplier_name'],Op.iLike,whereClause);
            Utils.validateFieldsParams('type_user',params['type_user'],Op.iLike,whereClause);
            Utils.validateFieldsParams('account_name',params['account_name'],Op.iLike,whereClause);
            Utils.validateFieldsParams('type',params['type'],Op.iLike,whereClause);
            Utils.validateFieldsParams('order_id',params['order_id'],Op.eq,whereClause);
            Utils.validateFieldsParams('account_id',params['account_id'],Op.eq,whereClause);
            Utils.validateFieldsParams('supplier_customer_id',params['supplier_customer_id'],Op.eq,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);
            /// supplier_name type_user account_name type / order_id account_id supplier_customer_id / amount /  / date_order created_at updated_at

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await IncomesExpensesSummaryView.findAll({
                where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                offset: offset,
                limit: page_size,
            });
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
};

export default IncomeService;
