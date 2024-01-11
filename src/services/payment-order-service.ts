import * as Joi from 'joi';
import PaymentOrder from '../models/payment-order-model';
import PaymentOrderView from '../models/views/payment-order-view';
import PaymentOrderValidation from '../validations/payment-order-validations';
import { IPaymentOrderModel,IPaymentOrderCreateModel,IPaymentOrderService } from '../interfaces/payment-order-interface';
import PurchaseOrderView from '../models/views/purchase-order-view';
import sequelize from '../config/connection/connection';
import Utils from '../utils/validate-data-utils';
import { ErrorRate } from '../config/error';

const PaymentOrderService: IPaymentOrderService = {
    async findAll(params: any): Promise < any[] > {
        try {
            const validate: Joi.ValidationResult = await PaymentOrderValidation.searchPaymentOrder(params);
            if (validate.error) throw new ErrorRate(validate.error.message,3);

            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldRangeParams(params,whereClause);

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await PaymentOrderView.findAll({
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
            const validate: Joi.ValidationResult =  PaymentOrderValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_order = await PaymentOrderView.findByPk(id);
            if(!payment_order){
                throw new ErrorRate("paymentorder_not_exist");
            }
            return payment_order;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async create(body: IPaymentOrderCreateModel): Promise < void > {
        try {
            const validate: Joi.ValidationResult = await PaymentOrderValidation.createPaymentOrder(body);
            if(validate.error) throw new ErrorRate(validate.error.message,3);

            Utils.validateDateToCurrent(body.payment_date,1);
            if (!body.payment_date)  body.payment_date = new Date();
            if (!body.status)  body.status = "pending";

            const jso_body=JSON.stringify(body);
            await sequelize.query('CALL create_payment_orders(:jso_body)', {
                replacements: {jso_body },
            });
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async update(id:number,body: IPaymentOrderModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentOrderValidation.updatePaymentOrder(body);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_order = await PaymentOrder.findByPk(id);
            if(!payment_order){
                throw new ErrorRate("paymentorder_not_exist");
            }
            const last_data={...payment_order.get()};
            const exist_in_product = await PurchaseOrderView.findOne({ where: {shopping_id:id}});
            if(exist_in_product){
                throw new ErrorRate("paymentorder_associated");
            }
            await payment_order.update(body);
            const new_data={...payment_order.get()};

            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentOrderValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_order = await PaymentOrder.findByPk(id);
            if(!payment_order){
                throw new ErrorRate("paymentorder_not_exist");
            }
            const last_data={...payment_order.get()};
            const exist_in_product = await PurchaseOrderView.findOne({ where: {shopping_id:id}});
            if(exist_in_product){
                throw new ErrorRate("paymentorder_associated");
            }
            await payment_order.destroy();
            const new_data={...payment_order.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentOrderValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_order = await PaymentOrder.findByPk(id, { paranoid: false });
            if(!payment_order){
                throw new ErrorRate("paymentorder_not_exist");
            }
            const last_data={...payment_order.get()};
            await payment_order.restore();
            const new_data={...payment_order.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
};

export default PaymentOrderService;
