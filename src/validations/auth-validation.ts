import * as Joi from 'joi';
import { IUserModelRegistry } from '../models/user-model';
import { errorJoiValidations } from '../config/error';
class AuthValidation {
    // Validation to create form
    login(params: {email: string, password: string}): Joi.ValidationResult <{email: string, password: string}> {
        let schema: Joi.Schema = Joi.object().keys({
            email: Joi.string().trim().empty().email().required(),
            password: Joi.string().trim().empty().required()
        });
        schema = errorJoiValidations(schema);
        return schema.validate(params);
    }
    singup( body: IUserModelRegistry ): Joi.ValidationResult < IUserModelRegistry > {
        let schema: Joi.Schema = Joi.object().keys({
            name: Joi.string().trim().empty().required(),
            last_name: Joi.string().optional(),
            second_surname: Joi.string().optional(),
            phone_number:  Joi.string().optional().min(10).max(15),
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        schema = errorJoiValidations(schema);
        return schema.validate(body);
    }
}

export default new AuthValidation();
