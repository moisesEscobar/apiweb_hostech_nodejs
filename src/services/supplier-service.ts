import * as Joi from 'joi';
import Supplier, { ISupplierModel } from '../models/supplier-model';
import SupplierView from '../models/views/supplier-view';
import SupplierValidation from '../validations/supplier-validations';
import { ISupplierService } from '../interfaces/supplier-interface';
import InventoryView from '../models/views/inventory-view';

const SupplierService: ISupplierService = {
    async findAll(): Promise < any[] > {
        try {
            return await SupplierView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  SupplierValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const supplier = await SupplierView.findByPk(id);
            if(!supplier){
                throw new Error("Supplier not found");
            }
            return supplier;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: ISupplierModel): Promise < ISupplierModel > {
        try {
            const validate: Joi.ValidationResult = await SupplierValidation.supplier(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const supplier_exist = await SupplierView.findOne({ where: {name:body.name}});
            if(supplier_exist){
                throw new Error("Supplier name exist");
            }
            const supplier: ISupplierModel = await Supplier.create({name:body.name});
            return supplier;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id:number,body: ISupplierModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = SupplierValidation.supplier(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const supplier = await Supplier.findByPk(id);
            if(!supplier){
                throw new Error("Supplier not found");
            }
            const last_data={...supplier.get()};
            const exist_in_product = await InventoryView.findOne({ where: {supplier_id:id}});
            if(exist_in_product){
                throw new Error("The supplier cannot be updated because it has associated inventory");
            }
            await supplier.update(body);
            const new_data={...supplier.get()};

            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = SupplierValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const supplier = await Supplier.findByPk(id);
            if(!supplier){
                throw new Error("Supplier not found");
            }
            const last_data={...supplier.get()};
            const exist_in_product = await InventoryView.findOne({ where: {supplier_id:id}});
            if(exist_in_product){
                throw new Error("The supplier cannot be eliminated because it has associated inventory");
            }
            await supplier.destroy();
            const new_data={...supplier.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = SupplierValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const supplier = await Supplier.findByPk(id, { paranoid: false });
            if(!supplier){
                throw new Error("Supplier not found");
            }
            const last_data={...supplier.get()};
            await supplier.restore();
            const new_data={...supplier.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default SupplierService;
