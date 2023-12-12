import * as Joi from 'joi';
import { IUserModelRegistry } from '../models/user-model';

class AuthValidation {
    // Validation to create form
    login(params: {email: string, password: string}): Joi.ValidationResult <{email: string, password: string}> {
        const schema: Joi.Schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        return schema.validate(params);
    }
    singup( body: IUserModelRegistry ): Joi.ValidationResult < IUserModelRegistry > {
        const schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().required(),
            last_name: Joi.string().required(),
            second_surname: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        return schema.validate(body);
    }
}

export default new AuthValidation();
