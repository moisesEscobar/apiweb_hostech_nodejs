import * as Joi from 'joi';
const { Op } = require('sequelize');
import Product, { IProductModel } from '../models/product-model';
import ProductValidation from '../validations/product-validations';
import { IProductService } from '../interfaces/product-interface';
import ProductView from '../models/views/product-view';
import BrandView from '../models/views/brand-view';
import ProductWithInventoryView from '../models/views/products_with_inventory';

const ProductService: IProductService = {
    async findAll(): Promise<any[]> {
        try {
            return await ProductView.findAll({});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async reportResume(): Promise<any[]> {
        try {
            return await ProductWithInventoryView.findAll({});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise<any> {
        try {
            const validate: Joi.ValidationResult = ProductValidation.validateId({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const product = await ProductView.findByPk(id);
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async search(params: any): Promise<any[]> {
        try {

            const whereClause: { [key: string]: any } = {};
            if (params['name']) {
                whereClause.name = { [Op.iLike]: `%${params['name']}%` };
            }
            if (params['key']) {
                whereClause.key = { [Op.iLike]: `%${params['key']}%` };
            }
            if (params['brand_id']) {
                whereClause.brand_id = { [Op.eq]: params['brand_id'] };
            }
            if (params['type_date'] && params['init_date'] && params['end_date']) {
                whereClause[params['type_date']] = {
                    [Op.gte]: new Date(`${params['init_date']}T00:00:00Z`),
                    [Op.lte]: new Date(`${params['end_date']}T23:59:59Z`),
                };
            }
            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 10;
            const offset = (page - 1) * page_size;

            // Realizar la consulta solo si hay al menos una condición
            if (Object.keys(whereClause).length > 0) {
                return await ProductView.findAll({
                    where: whereClause,
                    offset: offset,
                    limit: page_size,
                });
            } else {
                throw new Error("No se proporcionaron condiciones para la consulta.");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IProductModel): Promise<IProductModel> {
        try {
            const validate: Joi.ValidationResult = await ProductValidation.product(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand = await BrandView.findByPk(body.brand_id);
            if (!brand) {
                throw new Error("Brand not exist");
            }
            const product: IProductModel = await Product.create({
                name: body.name,
                key: body.key,
                price: body.price,
                reorder_point: body.reorder_point,
                brand_id: body.brand_id,
                supplier_id: body.supplier_id
            });
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id: number, body: IProductModel): Promise<any> {
        try {
            const validate: Joi.ValidationResult = await ProductValidation.product(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand = await BrandView.findByPk(body.brand_id);
            if (!brand) {
                throw new Error("Brand not exist");
            }
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error(`Product with ID ${id} not found`);
            }
            const last_data = { ...product.get() };
            await product.update(body);
            const new_data = { ...product.get() };
            return { last_data: last_data, new_data: new_data }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async remove(id: number): Promise<any> {
        try {
            const validate: Joi.ValidationResult = await ProductValidation.validateId({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error("Product not found");
            }
            const last_data = { ...product.get() };
            await product.destroy();
            const new_data = { ...product.get() };
            return { last_data: last_data, new_data: new_data }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise<any> {
        try {
            const validate: Joi.ValidationResult = ProductValidation.validateId({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const product = await Product.findByPk(id, { paranoid: false });
            if (!product) {
                throw new Error("Product not found");
            }
            const last_data = { ...product.get() };
            await product.restore();
            const new_data = { ...product.get() };
            return { last_data: last_data, new_data: new_data }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
export default ProductService;