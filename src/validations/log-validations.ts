import * as Joi from 'joi';
import { ILogModel } from '../models/log-model';
import User from '../models/user-model';

class LogValidation {
    async log(params: ILogModel) {
        const schema = Joi.object({
            action: Joi.string().required(),
            catalog: Joi.string().required(),
            user_id: Joi.number().integer().positive().required(),
            detail_last: Joi.string().optional().allow(null),
            detail_new: Joi.string().optional().allow(null)
        });
        return schema.validateAsync(params);
    }
}
export default new LogValidation();