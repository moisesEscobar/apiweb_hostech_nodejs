import * as Joi from 'joi';
import ShoppingInventoryView from '../models/views/shopping-inventory-view';
import ShoppingInventoryValidation from '../validations/shopping-inventory-validations';
import { IShoppingInventoryService,IShoppingInventoryModel } from '../interfaces/shopping-inventory-interface';
import sequelize from '../config/connection/connection';

const ShoppingInventoryService: IShoppingInventoryService = {
    async findAll(): Promise < any[] > {
        try {
            return await ShoppingInventoryView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IShoppingInventoryModel): Promise < void > {
        try {
            const validate: Joi.ValidationResult = await ShoppingInventoryValidation.create(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const { product_id,quantity,unit_price = null } = body;
            await sequelize.query('CALL create_shoping_and_inventories(:product_id, :quantity, :unit_price)', {
                replacements: { product_id, quantity, unit_price },
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
export default ShoppingInventoryService;
