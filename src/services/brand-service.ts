import * as Joi from 'joi';
const { Op } = require('sequelize');
import Brand, { IBrandModel } from '../models/brand-model';
import BrandValidation from '../validations/brand-validations';
import { IBrandService } from '../interfaces/brand-interface';

const BrandService: IBrandService = {
    async findAll(): Promise < IBrandModel[] > {
        try {
            return await Brand.findAll({});
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
            const brand = await Brand.findByPk(id);
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
            const brands = await Brand.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${params.name}%`,
                    },
                },
            });
            return brands;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: IBrandModel): Promise < IBrandModel > {
        try {
            const validate: Joi.ValidationResult = BrandValidation.brand(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const brand: IBrandModel = await Brand.create({
                name:body.name
            });
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
