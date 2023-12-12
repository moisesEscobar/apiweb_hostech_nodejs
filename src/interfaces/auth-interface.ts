import { IUserModel } from "../models/user-model";

export interface IAuthService {
    signup(data: any): Promise < string > ;
    login(body: {email: string, password: string, reload: boolean}): Promise <IUserModel>;
}