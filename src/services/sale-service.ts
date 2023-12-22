import * as Joi from 'joi';
import Sale, { ISaleModel } from '../models/sale-model';
import SaleView from '../models/views/sale-view';
import SaleValidation from '../validations/sale-validations';
import { ISaleService } from '../interfaces/sale-interface';
import { Op } from 'sequelize';
import ProductWithInventoryView from '../models/views/products_with_inventory';

const SaleService: ISaleService = {
    async findAll(): Promise<any[]> {
        try {
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
    async create(body: ISaleModel): Promise<any> {
        try {
            let message=null;
            const validate: Joi.ValidationResult = await SaleValidation.sale(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }

            let inventory_exist = await ProductWithInventoryView.findOne({
                where: {
                    product_id: body.product_id, 
                    quantity_available: {[Op.gt]: body.quantity},
                }
            });
            if (!inventory_exist) {
                throw new Error("The product is not found or not in stock");
            }
            const json_inventory = inventory_exist.toJSON();
            const sale: ISaleModel = await Sale.create({ 
                product_id: body.product_id,
                quantity: body.quantity,
                total_amount: (json_inventory.product_price*body.quantity)
            });
            if( (json_inventory.quantity_available-body.quantity) <= json_inventory.reorder_point){
                message=" Es necesario reordenar mas unidades de este producto"
            }
            return{message: message,sale: sale}
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
