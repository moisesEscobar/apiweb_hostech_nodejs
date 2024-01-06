import * as Joi from 'joi';
import { ILogModel } from '../models/log-model';

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
    searchSupplier(params: ILogModel): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            action:  Joi.string().optional().allow(''),
            catalog:  Joi.string().optional().allow(''),
            user_id:  Joi.number().optional().min(1).allow(''),
            user_name:  Joi.string().optional().allow(''),
            user_email:  Joi.string().optional().allow(''),
            type_date: Joi.string().valid('created_at', 'updated_at').optional().allow(''),
            init_date:  Joi.date().optional().allow(''),
            end_date:  Joi.date().optional().allow(''),
            page:  Joi.number().optional().min(1),
            page_size:  Joi.number().optional().min(1)
        });
        return schema.validate(params);
    }
    validateId(body: {id: number}): Joi.ValidationResult {
        const schema: Joi.Schema = Joi.object().keys({
            id: Joi.number().required()
        });
        return schema.validate(body);
    }
}
export default new LogValidation();