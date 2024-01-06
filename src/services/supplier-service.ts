import * as Joi from 'joi';
import Supplier, { ISupplierModel } from '../models/supplier-model';
import SupplierView from '../models/views/supplier-view';
import SupplierValidation from '../validations/supplier-validations';
import { ISupplierService } from '../interfaces/supplier-interface';
import InventoryView from '../models/views/inventory-view';
import { Op } from 'sequelize';
import ShoppingsSuppliersSumaryViewView from '../models/views/shoppings-suppliers-summary-view';
import Utils from '../utils/validate-data-utils';
import SalesCustomersSummarySumaryViewView from '../models/views/sales-customers-summary-view copy';

const SupplierService: ISupplierService = {
    async findAll(): Promise < any[] > {
        try {
            return await SupplierView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async summaryShopings(params: any): Promise < any[] > {
        try {
            const validate: Joi.ValidationResult = await SupplierValidation.searchSupplierSummary(params);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            //name, phone_number, address / total_products/total_amount_purchase,total_amount_paid,amount_payable / created_at,updated_at
            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldsParams('name',params['name'],Op.iLike,whereClause);
            Utils.validateFieldsParams('address',params['address'],Op.iLike,whereClause);
            Utils.validateFieldsParams('phone_number',params['phone_number'],Op.iLike,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            if(params['type_user']=='supplier'){
                return await ShoppingsSuppliersSumaryViewView.findAll({
                    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                    offset: offset,
                    limit: page_size,
                });
            }else if(params['type_user']=='customer'){
                return await SalesCustomersSummarySumaryViewView.findAll({
                    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                    offset: offset,
                    limit: page_size,
                });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async search(params: any): Promise<any[]> {
        try {
            const validate: Joi.ValidationResult = await SupplierValidation.searchSupplier(params);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldsParams('name',params['name'],Op.iLike,whereClause);
            Utils.validateFieldsParams('address',params['address'],Op.iLike,whereClause);
            Utils.validateFieldsParams('phone_number',params['phone_number'],Op.iLike,whereClause);
            Utils.validateFieldsParams('type_user',params['type_user'],Op.iLike,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await SupplierView.findAll({
                where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                offset: offset,
                limit: page_size,
            });
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
            const validate: Joi.ValidationResult = await SupplierValidation.createSupplier(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const supplier_exist = await SupplierView.findOne({ where: {name:body.name,type_user:body.type_user}});
            if(supplier_exist){
                throw new Error("Supplier name exist");
            }
            const supplier: ISupplierModel = await Supplier.create({
                name:body.name,
                phone_number:body.phone_number,
                type_user:body.type_user,
                address:body.address
            });
            return supplier;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id:number,body: ISupplierModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = SupplierValidation.updateSupplier(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const supplier = await Supplier.findByPk(id);
            if(!supplier){
                throw new Error("Supplier not found");
            }
            const last_data={...supplier.get()};
            const exist_in_product = await InventoryView.findOne({ where: {supplier_customer_id:id}});
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
            const exist_in_product = await InventoryView.findOne({ where: {supplier_customer_id:id}});
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
