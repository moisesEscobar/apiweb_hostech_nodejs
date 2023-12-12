import * as Joi from 'joi';
const { Op } = require('sequelize');
import Product, { IProductModel } from '../models/product-model';
import ProductValidation from '../validations/product-validations';
import { IProductService } from '../interfaces/product-interface';
import { Sequelize } from 'sequelize';
import { parse } from 'dotenv';
import Brand from '../models/brand-model';

const ProductService: IProductService = {
    async findAll(): Promise<IProductModel[]> {
        try {
            return await Product.findAll({
                include: [{
                    model: Brand,
                    attributes: ['id', 'name'], // selecciona los atributos que deseas incluir
                }],
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise<IProductModel> {
        try {
            const validate: Joi.ValidationResult = ProductValidation.validateId({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const product = await Product.findByPk(id, {include:[{
                model: Brand,
                attributes: ['id', 'name'], // selecciona los atributos que deseas incluir
            }]},);
            if (!product) {
                throw new Error("Product not found");
            }
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async search(params: any): Promise<IProductModel[]> {
        try {
            const products = await Product.findAll({
                where: {
                    [Op.or]: Object.entries(params).reduce((acc: any, [key, value]) => {
                        if (value) {
                            if (key == 'created_at' || key == 'updated_at') {
                                acc[key] = {
                                    [Op.gte]: new Date(String(value).substring(0, 10) + 'T00:00:00Z'),
                                    [Op.lte]: new Date(String(value).substring(0, 10) + 'T23:59:59Z'),
                                };
                            } else {
                                acc[key] = { [Op.iLike]: `%${value}%`, };
                            }
                        }
                        return acc;
                    }, {}),
                },
            });
            return products;
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
            const product: IProductModel = await Product.create({
                name: body.name,
                key: body.key,
                brand_id: body.brand_id
            });
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async remove(id: number): Promise<IProductModel> {
        try {
            const validate: Joi.ValidationResult = await ProductValidation.validateId({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error("Product not found");
            }
            await product.destroy();
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async update(id: number, body: IProductModel): Promise<void> {
        try {
            const validate: Joi.ValidationResult = await ProductValidation.product(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error("Product not found");
            }
            await product.update(body);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise<IProductModel> {
        try {
            const validate: Joi.ValidationResult = ProductValidation.validateId({ id });
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const product = await Product.findByPk(id, { paranoid: false });
            if (!product) {
                throw new Error("Product not found");
            }
            await product.restore();
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default ProductService;
