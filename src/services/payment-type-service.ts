import * as Joi from 'joi';
const { Op } = require('sequelize');
import PaymentType, { IPaymentTypeModel } from '../models/payment-type-model';
import PaymentTypeView from '../models/views/payment-type-view';
import PaymentTypeValidation from '../validations/payment-type-validations';
import { IPaymentTypeService } from '../interfaces/payment-type-interface';
import PaymentOrderTxnView from '../models/views/payment-order-txn-view';
import Utils from '../utils/validate-data-utils';
import { ErrorRate } from '../config/error';

const PaymentTypeService: IPaymentTypeService = {
    async findAll(params: any): Promise < any[] > {
        try {

            const validate: Joi.ValidationResult = await PaymentTypeValidation.searchPaymentType(params);
            if (validate.error) throw new ErrorRate(validate.error.message,3);

            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldsParams('name',params['name'],Op.iLike,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await PaymentTypeView.findAll({
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
            const validate: Joi.ValidationResult =  PaymentTypeValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_type = await PaymentTypeView.findByPk(id);
            if(!payment_type){
                throw new ErrorRate("paymenttype_not_exist");
            }
            return payment_type;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async create(body: IPaymentTypeModel): Promise < IPaymentTypeModel > {
        try {
            const validate: Joi.ValidationResult = await PaymentTypeValidation.payment(body);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_type_exist = await PaymentTypeView.findOne({ where: {name:body.name}});
            if(payment_type_exist){
                throw new ErrorRate("paymenttype_exist");
            }
            const payment_type: IPaymentTypeModel = await PaymentType.create({name:body.name});
            return payment_type;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async update(id:number,body: IPaymentTypeModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentTypeValidation.payment(body);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_type = await PaymentType.findByPk(id);
            if(!payment_type){
                throw new ErrorRate("paymenttype_not_exist");
            }
            const last_data={...payment_type.get()};
            const exist_in_product = await PaymentOrderTxnView.findOne({ where: {payment_type_id:id}});
            if(exist_in_product){
                throw new ErrorRate("paymenttype_associated");
            }
            await payment_type.update(body);
            const new_data={...payment_type.get()};

            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentTypeValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_type = await PaymentType.findByPk(id);
            if(!payment_type){
                throw new ErrorRate("paymenttype_not_exist");
            }
            const last_data={...payment_type.get()};
            const exist_in_product = await PaymentOrderTxnView.findOne({ where: {payment_type_id:id}});
            if(exist_in_product){
                throw new ErrorRate("paymenttype_associated");
            }
            await payment_type.destroy();
            const new_data={...payment_type.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentTypeValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_type = await PaymentType.findByPk(id, { paranoid: false });
            if(!payment_type){
                throw new ErrorRate("paymenttype_not_exist");
            }
            const last_data={...payment_type.get()};
            await payment_type.restore();
            const new_data={...payment_type.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
};

export default PaymentTypeService;
