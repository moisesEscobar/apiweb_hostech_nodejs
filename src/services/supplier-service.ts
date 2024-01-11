import * as Joi from 'joi';
import Supplier, { ISupplierModel } from '../models/supplier-model';
import SupplierView from '../models/views/supplier-view';
import SupplierValidation from '../validations/supplier-validations';
import { ISupplierService } from '../interfaces/supplier-interface';
import { Op } from 'sequelize';
import ShoppingsSuppliersSumaryViewView from '../models/views/shoppings-suppliers-summary-view';
import Utils from '../utils/validate-data-utils';
import SalesCustomersSummarySumaryViewView from '../models/views/sales-customers-summary-view copy';
import { ErrorRate } from '../config/error';
import SupplierTypesUserView from '../models/views/suppliers-typeuser-view';

const SupplierService: ISupplierService = {
    async findAll(): Promise < any[] > {
        try {
            return await SupplierView.findAll();
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async summaryShopings(params: any): Promise < any[] > {
        try {
            const validate: Joi.ValidationResult = await SupplierValidation.searchSupplierSummary(params);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
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
            throw new ErrorRate(error.message,error.code);
        }
    },
    async search(params: any): Promise<any[]> {
        try {
            const validate: Joi.ValidationResult = await SupplierValidation.searchSupplier(params);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
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
            throw new ErrorRate(error.message,error.code);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  SupplierValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const supplier = await SupplierView.findByPk(id);
            if(!supplier){
                throw new ErrorRate("supplier_not_exist");
            }
            return supplier;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async create(body: ISupplierModel): Promise < ISupplierModel > {
        try {
            const validate: Joi.ValidationResult = await SupplierValidation.createSupplier(body);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const supplier_exist = await SupplierView.findOne({ where: {name:body.name,type_user:body.type_user}});
            if(supplier_exist){
                throw new ErrorRate("suppliername_exist");
            }
            //SupplierTypesUserView
            const supplier: ISupplierModel = await Supplier.create({
                name:body.name,
                phone_number:body.phone_number,
                type_user:body.type_user,
                address:body.address
            });
            return supplier;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async update(id:number,body: ISupplierModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = SupplierValidation.updateSupplier(body);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const supplier = await Supplier.findByPk(id);
            if(!supplier){
                throw new ErrorRate("supplier_not_exist");
            }
            const last_data={...supplier.get()};

            /* const exist_in_product = await InventoryView.findOne({ where: {supplier_customer_id:id}});
            if(exist_in_product){
                throw new ErrorRate("sale_associated");
            } */

            const supplier_exist:any = await SupplierTypesUserView.findByPk(id);
            if(supplier_exist && !(supplier_exist.can_be).includes(body.type_user)){
                throw new ErrorRate("supplier_data_associated");
            }

            await supplier.update(body);
            const new_data={...supplier.get()};

            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = SupplierValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const supplier = await Supplier.findByPk(id);
            if(!supplier){
                throw new ErrorRate("supplier_not_exist");
            }
            const last_data={...supplier.get()};
            /*const exist_in_product = await InventoryView.findOne({ where: {supplier_customer_id:id}});
            if(exist_in_product){
                throw new ErrorRate("sale_associated");
            } */
            await supplier.destroy();       
            const new_data={...supplier.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = SupplierValidation.validateId({id});
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const supplier = await Supplier.findByPk(id, { paranoid: false });
            if(!supplier){
                throw new ErrorRate("supplier_not_exist");
            }
            const last_data={...supplier.get()};
            await supplier.restore();
            const new_data={...supplier.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
};

export default SupplierService;