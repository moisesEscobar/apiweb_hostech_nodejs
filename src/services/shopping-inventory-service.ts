import * as Joi from 'joi';
import ShoppingInventoryValidation from '../validations/shopping-inventory-validations';
import { IShoppingInventoryService,IShoppingInventoryCreateModel } from '../interfaces/shopping-inventory-interface';
import sequelize from '../config/connection/connection';
import { Op } from 'sequelize';
import ShoppingsView from '../models/views/shopping-view';
import Utils from '../utils/validate-data-utils';

const ShoppingInventoryService: IShoppingInventoryService = {
    async findAll(): Promise < any[] > {
        try {
            return await ShoppingsView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async search(params: any): Promise < any[] > {
        try {
            const validate: Joi.ValidationResult = await ShoppingInventoryValidation.searchShopping(params);
            if (validate.error) throw new Error(validate.error.message)

            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldsParams('supplier_customer_id',params['supplier_customer_id'],Op.eq,whereClause);
            Utils.validateFieldsParams('brand_id',params['brand_id'],Op.eq,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await ShoppingsView.findAll({
                where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                offset: offset,
                limit: page_size,
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IShoppingInventoryCreateModel): Promise < void > {
        try {
            const validate: Joi.ValidationResult = await ShoppingInventoryValidation.create(body);
            if(validate.error) throw new Error(validate.error.message);

            Utils.ValidateDateToCurrent(body.date_purchase,1);
            if (!body.date_purchase) body.date_purchase = new Date();

            const jso_body=JSON.stringify(body);
            await sequelize.query('CALL create_shopping_and_inventories(:jso_body)', {
                replacements: { jso_body },
            }); 
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  ShoppingInventoryValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const inventory = await ShoppingsView.findByPk(id);
            if(!inventory){
                throw new Error("Shopping not found");
            }
            return inventory;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
export default ShoppingInventoryService;
