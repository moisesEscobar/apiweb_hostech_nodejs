import * as Joi from 'joi';
import Shopping, { IShoppingModel } from '../models/shopping-model';
import ShoppingView from '../models/views/shopping-view';
import ShoppingValidation from '../validations/shopping-validations';
import { IShoppingService } from '../interfaces/shopping-interface';
import PurchaseOrderView from '../models/views/purchase-order-view';

const ShoppingService: IShoppingService = {
    async findAll(): Promise < any[] > {
        try {
            return await ShoppingView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  ShoppingValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const shopping = await ShoppingView.findByPk(id);
            if(!shopping){
                throw new Error("Shopping not found");
            }
            return shopping;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IShoppingModel): Promise < IShoppingModel > {
        try {
            const validate: Joi.ValidationResult = await ShoppingValidation.Shopping(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const shopping: IShoppingModel = await Shopping.create({
                inventory_id:body.inventory_id,
                unit_price:body.unit_price
            });
            return shopping;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id:number,body: IShoppingModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = ShoppingValidation.Shopping(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const shopping = await Shopping.findByPk(id);
            if(!shopping){
                throw new Error("Shopping not found");
            }
            const last_data={...shopping.get()};
            const exist_in_product = await PurchaseOrderView.findOne({ where: {shopping_id:id}});
            if(exist_in_product){
                throw new Error("The shopping cannot be updated because it has associated purchase orders");
            }
            await shopping.update(body);
            const new_data={...shopping.get()};

            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = ShoppingValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const shopping = await Shopping.findByPk(id);
            if(!shopping){
                throw new Error("Shopping not found");
            }
            const last_data={...shopping.get()};
            const exist_in_product = await PurchaseOrderView.findOne({ where: {shopping_id:id}});
            if(exist_in_product){
                throw new Error("The shopping cannot be eliminated because it has associated purchase orders");
            }
            await shopping.destroy();
            const new_data={...shopping.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = ShoppingValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const shopping = await Shopping.findByPk(id, { paranoid: false });
            if(!shopping){
                throw new Error("Shopping not found");
            }
            const last_data={...shopping.get()};
            await shopping.restore();
            const new_data={...shopping.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default ShoppingService;
