import * as Joi from 'joi';
const { Op } = require('sequelize');
import Product, { IProductModel } from '../models/product-model';
import ProductValidation from '../validations/product-validations';
import { IProductService } from '../interfaces/product-interface';
import ProductView from '../models/views/product-view';
import BrandView from '../models/views/brand-view';
import ProductWithInventoryView from '../models/views/products_with_inventory';
import SupplierView from '../models/views/supplier-view';
import Utils from '../utils/validate-data-utils';

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
            if (validate.error) throw new Error(validate.error.message)

            const product = await ProductView.findByPk(id);
            if (!product) throw new Error("Product not found");

            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async search(params: any): Promise<any[]> {
        try {
            const validate: Joi.ValidationResult = await ProductValidation.searchSupplier(params);
            if (validate.error) throw new Error(validate.error.message)

            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldsParams('name',params['name'],Op.iLike,whereClause);
            Utils.validateFieldsParams('sku',params['sku'],Op.iLike,whereClause);
            Utils.validateFieldsParams('brand_id',params['brand_id'],Op.eq,whereClause);
            Utils.validateFieldsParams('supplier_customer_id',params['supplier_customer_id'],Op.eq,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await ProductView.findAll({
                where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                offset: offset,
                limit: page_size,
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IProductModel): Promise<IProductModel> {
        try {
            const validate: Joi.ValidationResult = await ProductValidation.createProduct(body);
            if (validate.error) throw new Error(validate.error.message)

            const brand = await BrandView.findByPk(body.brand_id);
            if (!brand) throw new Error("Brand not exist")

            const supplier = await SupplierView.findOne({ where: {id:body.supplier_customer_id,type_user:'supplier'}});
            if (!supplier) throw new Error("Supplier not exist")

            const product_exist = await ProductView.findOne({ where: {sku:body.sku}});
            if (product_exist) throw new Error("Product sku exist")

            const product: IProductModel = await Product.create({
                name: body.name,
                sku: body.sku,
                description: body.description,
                price: body.price,
                reorder_point: body.reorder_point,
                brand_id: body.brand_id,
                supplier_customer_id: body.supplier_customer_id,
                path_file: body.path_file
            });
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id: number, body: IProductModel): Promise<any> {
        try {
            const validate: Joi.ValidationResult = await ProductValidation.updateProduct(body);
            if (validate.error) throw new Error(validate.error.message)

            const product = await Product.findByPk(id);
            if (!product) throw new Error("Product not found")

            if(body.brand_id){
                const brand = await BrandView.findByPk(body.brand_id);
                if (!brand) throw new Error("Brand not exist");
            }
            if(body.supplier_customer_id){
                const supplier = await SupplierView.findOne({ where: {id:body.supplier_customer_id,type_user:'supplier'}});
                if (!supplier) throw new Error("Supplier not exist");
            }
            if(body.sku){
                const product_exist = await ProductView.findOne({ where: {sku:body.sku}});
                if (product_exist) throw new Error("Product sku exist");
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
            if (validate.error) throw new Error(validate.error.message)

            const product = await Product.findByPk(id);
            if (!product) throw new Error("Product not found")

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
            if (validate.error) throw new Error(validate.error.message)

            const product = await Product.findByPk(id, { paranoid: false });
            if (!product) throw new Error("Product not found")

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