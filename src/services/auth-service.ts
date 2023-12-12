import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';// implementation of temporary library in which they give us the real accesses
import { IAuthService } from '../interfaces/auth-interface';
import AuthValidation from '../validations/auth-validation';
import User, { IUserModel, IUserModelRegistry } from '../models/user-model';

const AuthService: IAuthService = {
    //Generate user
    async signup( data : IUserModelRegistry): Promise < any > {
        try {
            const validate: Joi.ValidationResult<IUserModelRegistry> = AuthValidation.singup(data);
            if (validate.error) {
                throw new Error(validate.error.message);
            }

            // Verificar si el usuario ya existe
            const userExist = await User.findOne({ where: { email:data.email } });
            if (userExist) {
                throw new Error('Este correo electrónico ya ha sido registrado.');
            }

            // Crear un nuevo usuario
            const newUser = await User.create({
                name:data.name,
                last_name:data.last_name,
                second_surname:data.second_surname,
                email:data.email,
                password:data.password,
            });
            await newUser.encryptPassword();
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error(error);
        }
    },
    // Credentials are used to login and return a token
    async login(body: {email: string, password: string}): Promise < IUserModel > {
        try {
            const validate: Joi.ValidationResult < {email: string, password: string} > = AuthValidation.login(body);
            if (validate.error) {
                throw new Error(await validate.error.message);
            }
            const user: IUserModel  = await User.findOne({where:{email:body.email}});
            if (!user) {
                throw new Error('Error login notfound');
            }           
            const isMatched: boolean = await user.comparePassword(body.password);
            if (!isMatched) {
                throw new Error('Incorrect password');
            }
            return user;
        } catch (error) {
            throw new Error(error);
        }
    },
}
export default AuthService;