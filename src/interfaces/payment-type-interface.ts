import { IPaymentTypeModel } from '../models/payment-type-model';

export interface IPaymentTypeService {
    findAll(params: any): Promise<IPaymentTypeModel[]>;
    findOne(id: number): Promise<IPaymentTypeModel>;
    create(IPaymentTypeModel: IPaymentTypeModel): Promise<IPaymentTypeModel>;
    remove(id: number): Promise<any>;
    update(id: number,body: IPaymentTypeModel): Promise<any>;
    restore(id: number): Promise<any>;
}
