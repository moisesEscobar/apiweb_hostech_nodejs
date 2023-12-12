import * as Joi from 'joi';
const { Op } = require('sequelize');
import Log, { ILogModel } from '../models/log-model';
import LogValidation from '../validations/log-validations';
import { ILogService } from '../interfaces/log-interface';
import User from '../models/user-model';

const LogService: ILogService = {
    async findAll(): Promise < any[] > {
        try {
            return await Log.findAll({
                include: [{
                  model: User,
                  attributes: ['id', 'name', 'last_name','email'], // selecciona los atributos que deseas incluir
                }],
              });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async create(body: ILogModel): Promise < ILogModel > {
        try {
            const validate: Joi.ValidationResult = await LogValidation.log(body);
            if (validate.error) {
                throw new Error(validate.error.message);
            }
            const log: ILogModel = await Log.create({
                user_id:body.user_id,
                action:body.action,
                catalog:body.catalog
            });
            return log;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default LogService;
