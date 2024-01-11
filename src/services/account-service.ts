import * as Joi from 'joi';
import Account from '../models/account-model';
import AccountView from '../models/views/account-view';
import AccountValidation from '../validations/account-validations';
import { IAccountModel,IAccountService, IAccountViewModel } from '../interfaces/account-interface';
import Utils from '../utils/validate-data-utils';
import { ErrorRate } from '../config/error';

const AccountService: IAccountService = {
    async search(params: any): Promise < any[] > {
        try {
            const validate: Joi.ValidationResult = await AccountValidation.searchAccount(params);
            if (validate.error) throw new ErrorRate(validate.error.message,3);

            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldRangeParams(params,whereClause);

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;


            return await AccountView.findAll({
                where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                offset: offset,
                limit: page_size,
            });

        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  AccountValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const account = await AccountView.findByPk(id);
            if(!account){
                throw new ErrorRate("account_not_exist");
            }
            return account;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async create(body: IAccountModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = await AccountValidation.createAccount(body);
            if(validate.error) throw new ErrorRate(validate.error.message,3);

            const payment_type_exist = await AccountView.findOne({ where: {account_name:body.account_name}});
            if(payment_type_exist){
                throw new ErrorRate("account_exist");
            }
            return await Account.create({
                account_name:body.account_name,
                initial_balance: body.initial_balance
            });
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async update(id:number,body: IAccountModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = AccountValidation.updateAccount(body);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const account = await Account.findByPk(id);
            if(!account){
                throw new ErrorRate("account_not_exist");
            }
            const account_view:any = await AccountView.findByPk(id);
            if(body.initial_balance<=account_view.balance){
                throw new ErrorRate("account_balance");
            }
            const last_data={...account.get()};
            await account.update(body);
            const new_data={...account.get()};

            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = AccountValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const account = await Account.findByPk(id);
            if(!account){
                throw new ErrorRate("account_not_exist");
            }
            const last_data={...account.get()};

            await account.destroy();

            const new_data={...account.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = AccountValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const account = await Account.findByPk(id, { paranoid: false });
            if(!account){
                throw new ErrorRate("account_not_exist");
            }
            const last_data={...account.get()};
            await account.restore();
            const new_data={...account.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
};

export default AccountService;
