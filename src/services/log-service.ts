import * as Joi from 'joi';
import { ILogModel } from '../models/log-model';
import LogValidation from '../validations/log-validations';
import { ILogService } from '../interfaces/log-interface';
import LogView from '../models/views/log-view';
import sequelize from '../config/connection/connection';

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
            /* const log: ILogModel = await Log.create({
                user_id: body.user_id,
                action: body.action,
                catalog: body.catalog,
                detail_last: body.detail_last,
                detail_new: body.detail_new
            }); */
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default LogService;
