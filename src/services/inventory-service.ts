import * as Joi from 'joi';
import Inventory, { IInventoryModel } from '../models/inventory-model';
import InventoryView from '../models/views/inventory-view';
import InventoryValidation from '../validations/inventory-validations';
import { IInventoryService } from '../interfaces/inventory-interface';
import ProductView from '../models/views/product-view';
import SupplierView from '../models/views/supplier-view';

const InventoryService: IInventoryService = {
    async findAll(): Promise < any[] > {
        try {
            return await InventoryView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  InventoryValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const inventory = await InventoryView.findByPk(id);
            if(!inventory){
                throw new Error("Inventory not found");
            }
            return inventory;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IInventoryModel): Promise < IInventoryModel > {
        try {
            const validate: Joi.ValidationResult = await InventoryValidation.inventory(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const product_exist = await ProductView.findOne({ where: {id:body.product_id}});
            if(!product_exist){
                throw new Error("Product not exist");
            }
            const inventory: IInventoryModel = await Inventory.create({
                product_id: body.product_id,
                quantity: body.quantity
            });
            return inventory;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id:number,body: IInventoryModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = InventoryValidation.updateInventory(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const inventory = await Inventory.findByPk(id);
            if(!inventory){
                throw new Error("Inventory not found");
            }
            const last_data={...inventory.get()};
            await inventory.update(body);
            const new_data={...inventory.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = InventoryValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const inventory = await Inventory.findByPk(id);
            if(!inventory){
                throw new Error("Inventory not found");
            }
            const last_data={...inventory.get()};
            await inventory.destroy();
            const new_data={...inventory.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = InventoryValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const inventory = await Inventory.findByPk(id, { paranoid: false });
            if(!inventory){
                throw new Error("Inventory not found");
            }
            const last_data={...inventory.get()};
            await inventory.restore();
            const new_data={...inventory.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default InventoryService;
