import * as Joi from 'joi';
import PaymentOrder from '../models/payment-order-model';
import PaymentOrderView from '../models/views/payment-order-view';
import PaymentOrderValidation from '../validations/payment-order-validations';
import { IPaymentOrderModel,IPaymentOrderService } from '../interfaces/payment-order-interface';
import PurchaseOrderView from '../models/views/purchase-order-view';
import sequelize from '../config/connection/connection';

const PaymentOrderService: IPaymentOrderService = {
    async findAll(): Promise < any[] > {
        try {
            return await PaymentOrderView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  PaymentOrderValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const payment_order = await PaymentOrderView.findByPk(id);
            if(!payment_order){
                throw new Error("Payment order not found");
            }
            return payment_order;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IPaymentOrderModel): Promise < void > {
        try {
            const validate: Joi.ValidationResult = await PaymentOrderValidation.paymentOrder(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            
            const { shopping_id,payment_date,status } = body;
            await sequelize.query('CALL create_payment_orders(:shopping_id, :payment_date, :status)', {
                replacements: { shopping_id, payment_date, status },
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id:number,body: IPaymentOrderModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentOrderValidation.paymentOrder(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const payment_order = await PaymentOrder.findByPk(id);
            if(!payment_order){
                throw new Error("PaymentOrder not found");
            }
            const last_data={...payment_order.get()};
            const exist_in_product = await PurchaseOrderView.findOne({ where: {shopping_id:id}});
            if(exist_in_product){
                throw new Error("The shopping cannot be eliminated because it has associated purchase orders");
            }
            await payment_order.update(body);
            const new_data={...payment_order.get()};

            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentOrderValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const payment_order = await PaymentOrder.findByPk(id);
            if(!payment_order){
                throw new Error("Payment order not found");
            }
            const last_data={...payment_order.get()};
            const exist_in_product = await PurchaseOrderView.findOne({ where: {shopping_id:id}});
            if(exist_in_product){
                throw new Error("The shopping cannot be eliminated because it has associated purchase orders");
            }
            await payment_order.destroy();
            const new_data={...payment_order.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentOrderValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const payment_order = await PaymentOrder.findByPk(id, { paranoid: false });
            if(!payment_order){
                throw new Error("Payment order not found");
            }
            const last_data={...payment_order.get()};
            await payment_order.restore();
            const new_data={...payment_order.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default PaymentOrderService;
