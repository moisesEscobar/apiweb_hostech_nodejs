import * as Joi from 'joi';
import InventoryView from '../models/views/inventory-view';
import InventoryValidation from '../validations/inventory-validations';
import { IInventoryService } from '../interfaces/inventory-interface';
import ProductWithInventoryView from '../models/views/products_with_inventory';
import { Op } from 'sequelize';
import Utils from '../utils/validate-data-utils';

const InventoryService: IInventoryService = {
    async search(params: any): Promise < any[] > {
        try {

            // product_id,supplier_customer_id,product_sku,brand_id
            // product_price,product_reorder_point,quantity_sold,total_quantity,quantity_available,total_amount_sold

            const validate: Joi.ValidationResult = await InventoryValidation.searchInventory(params);
            if (validate.error) throw new Error(validate.error.message)

            const whereClause: { [key: string]: any } = {};

            Utils.validateFieldsParams('product_id',params['product_id'],Op.eq,whereClause);
            Utils.validateFieldsParams('supplier_customer_id',params['supplier_customer_id'],Op.eq,whereClause);
            Utils.validateFieldsParams('product_sku',params['product_sku'],Op.iLike,whereClause);
            Utils.validateFieldsParams('brand_id',params['brand_id'],Op.eq,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);
            console.log(whereClause);
 

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await ProductWithInventoryView.findAll({
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
            const validate: Joi.ValidationResult =  InventoryValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const inventory = await ProductWithInventoryView.findByPk(id);
            if(!inventory){
                throw new Error("Inventory not found");
            }
            return inventory;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default InventoryService;
