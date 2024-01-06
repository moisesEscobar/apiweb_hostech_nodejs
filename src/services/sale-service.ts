import * as Joi from 'joi';
import Sale, { ISaleModel } from '../models/sale-model';
import SaleView from '../models/views/sale-view';
import SaleValidation from '../validations/sale-validations';
import { ISaleService ,ISaleCreateModel} from '../interfaces/sale-interface';
import { Op } from 'sequelize';
import ProductWithInventoryView from '../models/views/products_with_inventory';
import sequelize from '../config/connection/connection';
import Utils from '../utils/validate-data-utils';
import ProductView from '../models/views/product-view';

const SaleService: ISaleService = {
    async findAll(params: any): Promise<any[]> {
        try {

            const validate: Joi.ValidationResult = await SaleValidation.searchSale(params);
            if (validate.error) throw new Error(validate.error.message)

            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldsParams('supplier_customer_id',params['supplier_customer_id'],Op.eq,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await SaleView.findAll({
                where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                offset: offset,
                limit: page_size,
            });

            return await SaleView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise<any> {
        try {
            const validate: Joi.ValidationResult = SaleValidation.validateId({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const sale = await SaleView.findByPk(id);
            if (!sale) {
                throw new Error("Sale not found");
            }
            return sale;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: ISaleCreateModel): Promise<any> {
        try {

            let message=[];
            const validate: Joi.ValidationResult = await SaleValidation.createSale(body);
            if(validate.error) throw new Error(validate.error.message);

            Utils.ValidateDateToCurrent(body.date_sale,1);
            if (!body.date_sale) body.date_sale = new Date();

            const jso_body=JSON.stringify(body);
            await sequelize.query('CALL create_product_sale(:jso_body)', { replacements: { jso_body },});

            for (const element of body.products) {
                const product_i:any = await ProductWithInventoryView.findByPk(element.product_id);
                if (product_i && (product_i.product_reorder_point >= product_i.quantity_available)) {
                    message.push("El producto " + element.product_id + " necesita reordenar unidades, STOCK actual: " + product_i.quantity_available);
                }
            }
            return{message: message}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id: number, body: ISaleModel): Promise<any> {
        try {
            let message=null;
            const validate: Joi.ValidationResult = SaleValidation.sale(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const sale = await Sale.findByPk(id);
            if (!sale) {
                throw new Error("Sale not found");
            }
            const last_data = { ...sale.get() };
            
            if(body.quantity>last_data.quantity){
                let inventory_exist = await ProductWithInventoryView.findOne({
                    where: {product_id: body.product_id, quantity_available: {[Op.gt]: body.quantity}}
                });
                if (!inventory_exist) {
                    throw new Error("The product is not found or not in stock");
                }
            }
            await sale.update(body);
            const new_data = { ...sale.get() };

            let inventory = await ProductWithInventoryView.findOne({where: {product_id: body.product_id}});
            if(inventory){
                const json_inventory = inventory.toJSON();
                if(json_inventory.quantity_available <= json_inventory.product_reorder_point){
                    message=" Es necesario reordenar mas unidades de este producto"
                }
            }
            return { message,last_data: last_data, new_data: new_data }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async remove(id: number): Promise<any> {
        try {
            const validate: Joi.ValidationResult = SaleValidation.validateId({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const sale = await Sale.findByPk(id);
            if (!sale) {
                throw new Error("Sale not found");
            }
            const last_data = { ...sale.get() };
            await sale.destroy();
            const new_data = { ...sale.get() };
            return { last_data: last_data, new_data: new_data }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise<any> {
        try {
            const validate: Joi.ValidationResult = SaleValidation.validateId({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const sale = await Sale.findByPk(id, { paranoid: false });
            if (!sale) {
                throw new Error("Sale not found");
            }
            const last_data = { ...sale.get() };
            await sale.restore();
            const new_data = { ...sale.get() };
            return { last_data: last_data, new_data: new_data }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default SaleService;
