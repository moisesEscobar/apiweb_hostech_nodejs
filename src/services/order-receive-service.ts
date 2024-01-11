import * as Joi from 'joi';
import OrderReceiveView from '../models/views/order-receive-view';
import OrderReceiveValidation from '../validations/order-receive-validations';
import {IOrderReceiveCreateModel,IOrderReceiveService } from '../interfaces/order-receive-interface';
import sequelize from '../config/connection/connection';
import { Op } from 'sequelize';
import Utils from '../utils/validate-data-utils';
import { ErrorRate } from '../config/error';

const OrderReceiveService: IOrderReceiveService = {
    async search(params: any): Promise < any[] > {
        try {
            const validate: Joi.ValidationResult = await OrderReceiveValidation.searchShopping(params);
            if (validate.error) throw new ErrorRate(validate.error.message,3);

            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldsParams('supplier_customer_id',params['supplier_customer_id'],Op.eq,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await OrderReceiveView.findAll({
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
            const validate: Joi.ValidationResult =  OrderReceiveValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const order_receive = await OrderReceiveView.findByPk(id);
            if(!order_receive){
                throw new ErrorRate("orderreceive_not_exist");
            }
            return order_receive;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async create(body: IOrderReceiveCreateModel): Promise < void > {
        try {
            const validate: Joi.ValidationResult = await OrderReceiveValidation.createOrderReceive(body);
            if(validate.error) throw new ErrorRate(validate.error.message,3);

            Utils.validateDateToCurrent(body.date_order,1);
            if (!body.date_order)  body.date_order = new Date();

            const jso_body=JSON.stringify(body);
            await sequelize.query('CALL create_order_receive_sales(:jso_body)', {
                replacements: {jso_body },
            });
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    }
};

export default OrderReceiveService;
