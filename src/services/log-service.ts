import * as Joi from 'joi';
import { ILogModel } from '../models/log-model';
import LogValidation from '../validations/log-validations';
import { ILogService } from '../interfaces/log-interface';
import LogView from '../models/views/log-view';
import sequelize from '../config/connection/connection';
import { Op } from 'sequelize';
import Utils from '../utils/validate-data-utils';

const LogService: ILogService = {
    async findAll(): Promise<any[]> {
        try {
            return await LogView.findAll({});
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: ILogModel): Promise<any> {
        try {
            const validate: Joi.ValidationResult = await LogValidation.log(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }

            // Llamada al procedimiento almacenado desde Sequelize
            const { user_id, action, catalog, detail_last = null, detail_new = null } = body;
            await sequelize.query('CALL create_log(:user_id, :action, :catalog, :detail_last, :detail_new)', {
                replacements: { user_id, action, catalog, detail_last, detail_new },
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async search(params: any): Promise<any[]> {
        try {
            //action,catalog,user_id,user_name, user_last_name, user_email,created_at, updated_at
            const validate: Joi.ValidationResult = await LogValidation.searchSupplier(params);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const whereClause: { [key: string]: any } = {};
            Utils.validateFieldsParams('action',params['action'],Op.iLike,whereClause);
            Utils.validateFieldsParams('catalog',params['catalog'],Op.iLike,whereClause);
            Utils.validateFieldsParams('product_sku',params['product_sku'],Op.iLike,whereClause);
            Utils.validateFieldsParams('brand_id',params['brand_id'],Op.eq,whereClause);
            Utils.validateFieldRangeParams(params,whereClause);

            const page = params['page'] ? parseInt(params['page'], 10) : 1;
            const page_size = params['page_size'] ? parseInt(params['page_size'], 10) : 200;
            const offset = (page - 1) * page_size;

            return await LogView.findAll({
                where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
                offset: offset,
                limit: page_size,
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async findOne(id: number): Promise<any> {
        try {
            const validate: Joi.ValidationResult = LogValidation.validateId({ id });
            if (validate.error) throw new Error(validate.error.message)
            const product = await LogView.findByPk(id);
            if (!product) throw new Error("Log not found");
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default LogService;
