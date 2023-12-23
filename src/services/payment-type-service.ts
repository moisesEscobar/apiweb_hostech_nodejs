import * as Joi from 'joi';
const { Op } = require('sequelize');
import PaymentType, { IPaymentTypeModel } from '../models/payment-type-model';
import PaymentTypeView from '../models/views/payment-type-view';
import PaymentTypeValidation from '../validations/payment-type-validations';
import { IPaymentTypeService } from '../interfaces/payment-type-interface';
import ProductView from '../models/views/product-view';

const PaymentTypeService: IPaymentTypeService = {
    async findAll(): Promise < any[] > {
        try {
            return await PaymentTypeView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  PaymentTypeValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const payment_type = await PaymentTypeView.findByPk(id);
            if(!payment_type){
                throw new Error("PaymentType not found");
            }
            return payment_type;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async search(params: any): Promise < any[] > {
        try {
            const payment_types = await PaymentTypeView.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${params.name}%`,
                    }
                },
            });
            return payment_types;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IPaymentTypeModel): Promise < IPaymentTypeModel > {
        try {
            const validate: Joi.ValidationResult = await PaymentTypeValidation.payment(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const payment_type_exist = await PaymentTypeView.findOne({ where: {name:body.name}});
            if(payment_type_exist){
                throw new Error("PaymentType name exist");
            }
            const payment_type: IPaymentTypeModel = await PaymentType.create({name:body.name});
            return payment_type;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id:number,body: IPaymentTypeModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentTypeValidation.payment(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const payment_type = await PaymentType.findByPk(id);
            if(!payment_type){
                throw new Error("PaymentType not found");
            }
            const last_data={...payment_type.get()};
            const exist_in_product = await ProductView.findOne({ where: {payment_type_id:id}});
            console.log(exist_in_product)
            if(exist_in_product){
                throw new Error("The payment type cannot be updated because it has associated products");
            }
            await payment_type.update(body);
            const new_data={...payment_type.get()};

            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentTypeValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const payment_type = await PaymentType.findByPk(id);
            if(!payment_type){
                throw new Error("PaymentType not found");
            }
            const last_data={...payment_type.get()};
            const exist_in_product = await ProductView.findOne({ where: {payment_type_id:id}});
            if(exist_in_product){
                throw new Error("The payment_type cannot be eliminated because it has associated products");
            }
            await payment_type.destroy();
            const new_data={...payment_type.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PaymentTypeValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const payment_type = await PaymentType.findByPk(id, { paranoid: false });
            if(!payment_type){
                throw new Error("PaymentType not found");
            }
            const last_data={...payment_type.get()};
            await payment_type.restore();
            const new_data={...payment_type.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default PaymentTypeService;
