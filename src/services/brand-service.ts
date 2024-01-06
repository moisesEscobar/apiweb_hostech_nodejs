import * as Joi from 'joi';
const { Op } = require('sequelize');
import Brand, { IBrandModel } from '../models/brand-model';
import BrandView from '../models/views/brand-view';
import BrandValidation from '../validations/brand-validations';
import { IBrandService } from '../interfaces/brand-interface';
import ProductView from '../models/views/product-view';

import BrandWithProductView from '../models/views/brand-withproducts-view';
import Utils from '../utils/validate-data-utils';

const BrandService: IBrandService = {
    async findAll(): Promise < any[] > {
        try {
            return await BrandView.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findAllWithProducts(): Promise < any[] > {
        try {
            return await BrandWithProductView.findAll({});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult =  BrandValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand = await BrandView.findByPk(id);
            if(!brand){
                throw new Error("Brand not found");
            }
            return brand;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async search(params: any): Promise < any[] > {
        try {

            const validate: Joi.ValidationResult = await BrandValidation.searchSupplier(params);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldsParams('name',params['name'],Op.iLike,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);;

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await BrandView.findAll({
                where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                offset: offset,
                limit: page_size,
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IBrandModel): Promise < IBrandModel > {
        try {
            const validate: Joi.ValidationResult = await BrandValidation.brand(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand_exist = await BrandView.findOne({ where: {name:body.name}});
            if(brand_exist){
                throw new Error("Brand name exist");
            }
            const brand: IBrandModel = await Brand.create({name:body.name});
            return brand;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async update(id:number,body: IBrandModel): Promise < any > {
        try {
            const validate: Joi.ValidationResult = BrandValidation.brand(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand = await Brand.findByPk(id);
            if(!brand){
                throw new Error("Brand not found");
            }
            const brand_exist = await BrandView.findOne({ where: {name:body.name}});
            if(brand_exist){
                throw new Error("Brand name exist");
            }
            const last_data={...brand.get()};
            const exist_in_product = await ProductView.findOne({ where: {brand_id:id}});
            if(exist_in_product){
                throw new Error("The brand cannot be updated because it has associated products");
            }
            await brand.update(body);
            const new_data={...brand.get()};

            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async remove(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = BrandValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand = await Brand.findByPk(id);
            if(!brand){
                throw new Error("Brand not found");
            }
            const last_data={...brand.get()};
            const exist_in_product = await ProductView.findOne({ where: {brand_id:id}});
            if(exist_in_product){
                throw new Error("The brand cannot be eliminated because it has associated products");
            }
            await brand.destroy();
            const new_data={...brand.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise < any > {
        try {
            const validate: Joi.ValidationResult = BrandValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand = await Brand.findByPk(id, { paranoid: false });
            if(!brand){
                throw new Error("Brand not found");
            }
            const last_data={...brand.get()};
            await brand.restore();
            const new_data={...brand.get()};
            return {last_data:last_data,new_data:new_data}
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default BrandService;
