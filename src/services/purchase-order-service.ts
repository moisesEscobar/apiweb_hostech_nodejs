import * as Joi from 'joi';
import PurchaseOrder, { IPurchaseOrderModel } from '../models/purchase-order-model';
import PurchaseOrderView from '../models/views/purchase-order-view';
import PurchaseOrderValidation from '../validations/purchase-order-validations';
import { IPurchaseOrderService } from '../interfaces/purchase-order-interface';

const PurchaseOrderService: IPurchaseOrderService = {
    async findAll(): Promise < any[] > {
        try {
            return await PurchaseOrderView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  PurchaseOrderValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const purchase_order = await PurchaseOrderView.findByPk(id);
            if(!purchase_order){
                throw new Error("Purchase order not found");
            }
            return purchase_order;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IPurchaseOrderModel): Promise < IPurchaseOrderModel > {
        try {
            const validate: Joi.ValidationResult = await PurchaseOrderValidation.purchaseOrder(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const purchase_order_exist = await PurchaseOrderView.findOne({ where: {
                shopping_id:body.shopping_id,
                payment_order_id:body.payment_order_id
            }});
            if(purchase_order_exist){
                throw new Error("PurchaseOrder  exist");
            }
            const purchase_order: IPurchaseOrderModel = await PurchaseOrder.create({
                shopping_id:body.shopping_id,
                payment_order_id:body.payment_order_id
            });
            return purchase_order;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id:number,body: IPurchaseOrderModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PurchaseOrderValidation.purchaseOrder(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const purchase_order = await PurchaseOrder.findByPk(id);
            if(!purchase_order){
                throw new Error("Purchase order not found");
            }
            const last_data={...purchase_order.get()};
            await purchase_order.update(body);
            const new_data={...purchase_order.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PurchaseOrderValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const purchase_order = await PurchaseOrder.findByPk(id);
            if(!purchase_order){
                throw new Error("Purchase order not found");
            }
            const last_data={...purchase_order.get()};
            await purchase_order.destroy();
            const new_data={...purchase_order.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = PurchaseOrderValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const purchase_order = await PurchaseOrder.findByPk(id, { paranoid: false });
            if(!purchase_order){
                throw new Error("Purchase order not found");
            }
            const last_data={...purchase_order.get()};
            await purchase_order.restore();
            const new_data={...purchase_order.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default PurchaseOrderService;
