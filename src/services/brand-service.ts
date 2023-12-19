import * as Joi from 'joi';
const { Op } = require('sequelize');
import Brand, { IBrandModel } from '../models/brand-model';
import BrandView from '../models/views/brand-view';
import BrandValidation from '../validations/brand-validations';
import { IBrandService } from '../interfaces/brand-interface';
import ProductView from '../models/views/product-view';

const BrandService: IBrandService = {
    async findAll(): Promise < IBrandModel[] > {
        try {
            return await BrandView.findAll({where:{deleted_at:null}});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise < IBrandModel > {
        try {
            const validate: Joi.ValidationResult =  BrandValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand = await BrandView.findOne({ where: {id,deleted_at: null}});
            if(!brand){
                throw new Error("Brand not found");
            }
            return brand;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async search(params: any): Promise < IBrandModel[] > {
        try {
            const brands = await BrandView.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${params.name}%`,
                    },
                    deleted_at:null
                },
            });
            return brands;
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
            const brand_exist = await BrandView.findOne({ where: {name:body.name,deleted_at: null}});
            if(brand_exist){
                throw new Error("Brand name exist");
            }
            const brand: IBrandModel = await Brand.create({name:body.name});
            return brand;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async remove(id: number): Promise < IBrandModel > {
        try {
            const validate: Joi.ValidationResult = BrandValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand = await Brand.findByPk(id);
            if(!brand){
                throw new Error("Brand not found");
            }
            const exist_in_product = await ProductView.findOne({ where: {brand_id:id,deleted_at: null}});
            if(exist_in_product){
                throw new Error("The brand cannot be eliminated because it has associated products");
            }
            await brand.destroy();
            return brand;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async update(id:number,body: IBrandModel): Promise < void > {
        try {
            const validate: Joi.ValidationResult = BrandValidation.brand(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand = await Brand.findByPk(id);
            if(!brand){
                throw new Error("Brand not found");
            }
            const exist_in_product = await ProductView.findOne({ where: {brand_id:id,deleted_at: null}});
            if(exist_in_product){
                throw new Error("The brand cannot be updated because it has associated products");
            }
            await brand.update(body);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async restore(id: number): Promise < IBrandModel > {
        try {
            const validate: Joi.ValidationResult = BrandValidation.validateId({id});
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand = await Brand.findByPk(id, { paranoid: false });
            if(!brand){
                throw new Error("Brand not found");
            }
            await brand.restore();
            return brand;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default BrandService;
