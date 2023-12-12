import * as Joi from 'joi';
import { ILogModel } from '../models/log-model';
import User from '../models/user-model';

class LogValidation {
    async log(params: ILogModel) {
        const schema = Joi.object({
            action: Joi.string().required(),
            catalog: Joi.string().required(),
            user_id: Joi.number().integer().positive().required().custom(async (value, helpers) => {
                const userExist = await User.findByPk(value);
                if (!userExist) {
                    return helpers.error('any.invalid', { message: 'The user does not exist' });
                }
                return value;
            }).messages({ 'any.invalid': '{{#message}}' }),
        });
        return await schema.validateAsync(params);
    }
}
export default new LogValidation();
