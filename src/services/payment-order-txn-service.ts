import * as Joi from 'joi';
import PaymentOrderTxn, { IPaymentOrderTxnModel } from '../models/payment-order-txn-model';
import PaymentOrderTxnView from '../models/views/payment-order-txn-view';
import PaymentOrderTxnValidation from '../validations/payment-order-txn-validations';
import { IPaymentOrderTxnService } from '../interfaces/payment-order-txn-interface';
import sequelize from '../config/connection/connection';
import { ErrorRate } from '../config/error';

const PaymentOrderTxnService: IPaymentOrderTxnService = {
    async findAll(): Promise < any[] > {
        try {
            return await PaymentOrderTxnView.findAll();
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  PaymentOrderTxnValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_order_txn= await PaymentOrderTxnView.findByPk(id);
            if(!payment_order_txn){
                throw new ErrorRate("paymentordertxn_not_exist");
            }
            return payment_order_txn;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async create(body: IPaymentOrderTxnModel): Promise < IPaymentOrderTxnModel > {
        try {
            const validate: Joi.ValidationResult = await PaymentOrderTxnValidation.createPaymentOrderTxn(body);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const { 
                status,user_id=null,
                payment_type_id, payment_order_id, supplier_customer_id
            } = body;
            const payment_order_txn: any = await sequelize.query(
                'SELECT create_payment_order_txns(:status, :user_id, :payment_type_id, :payment_order_id,:supplier_customer_id)', {
                replacements: { status, user_id, payment_type_id, payment_order_id,supplier_customer_id },
            });
            /* const payment_order_txn: IPaymentOrderTxnModel = await PaymentOrderTxn.create({
                status:body.status,
                amount:body.amount,
                user_id:body.user_id,
                payment_type_id:body.payment_type_id,
                payment_order_id:body.payment_order_id,
                supplier_customer_id:body.supplier_customer_id
            }); */
            return payment_order_txn[0][0].create_payment_order_txns;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async update(id:number,body: IPaymentOrderTxnModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentOrderTxnValidation.updatePaymentOrderTxn(body);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_order_txn= await PaymentOrderTxn.findByPk(id);
            if(!payment_order_txn){
                throw new ErrorRate("paymentordertxn_not_exist");
            }
            const last_data={...payment_order_txn.get()};
            await payment_order_txn.update(body);
            const new_data={...payment_order_txn.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentOrderTxnValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_order_txn= await PaymentOrderTxn.findByPk(id);
            if(!payment_order_txn){
                throw new ErrorRate("paymentordertxn_not_exist");
            }
            const last_data={...payment_order_txn.get()};
            await payment_order_txn.destroy();
            const new_data={...payment_order_txn.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentOrderTxnValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const payment_order_txn= await PaymentOrderTxn.findByPk(id, { paranoid: false });
            if(!payment_order_txn){
                throw new ErrorRate("paymentordertxn_not_exist");
            }
            const last_data={...payment_order_txn.get()};
            await payment_order_txn.restore();
            const new_data={...payment_order_txn.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
};
export default PaymentOrderTxnService;
