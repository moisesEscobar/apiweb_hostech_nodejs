import * as Joi from 'joi';
import { IAuthService } from '../interfaces/auth-interface';
import AuthValidation from '../validations/auth-validation';
import User, {IUserModelRegistry } from '../models/user-model';
import  UserView, {IUserViewModel} from '../models/views/user-view';
import { ErrorRate } from '../config/error';



const AuthService: IAuthService = {
    //Generate user
    async signup( data : IUserModelRegistry): Promise < any > {
        try {
            const validate: Joi.ValidationResult<IUserModelRegistry> = AuthValidation.singup(data);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            // Verificar si el usuario ya existe
            const user_exist: IUserViewModel  = await UserView.findOne({where:{email:data.email}});
            if (user_exist) {
                throw new ErrorRate('email_exist');
            } 
            // Crear un nuevo usuario
            const newUser = await User.create({
                name:data.name,
                last_name:data.last_name,
                second_surname:data.second_surname,
                email:data.email,
                password:data.password,
                phone_number:data.phone_number
            });
            await newUser.encryptPassword();
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
    // Credentials are used to login and return a token
    async login(body: {email: string, password: string}): Promise < IUserViewModel > {
        try {
            const validate: Joi.ValidationResult < {email: string, password: string} > = AuthValidation.login(body);
            if (validate.error) {
                throw new ErrorRate(validate.error.message,3);
            }
            const user: IUserViewModel  = await UserView.findOne({where:{email:body.email}});
            if (!user) {
                throw new ErrorRate('email_not_exist');
            }           
            const is_matched: boolean = await user.comparePassword(body.password);
            if (!is_matched) {
                throw new ErrorRate('incorrect_password');
            }
            return user;
        } catch (error) {
            throw new ErrorRate(error.message,error.code);
        }
    },
}
export default AuthService;