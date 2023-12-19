import { IUserViewModel } from "src/models/views/user-view";

export interface IAuthService {
    signup(data: any): Promise < string > ;
    login(body: {email: string, password: string, reload: boolean}): Promise <IUserViewModel>;
}