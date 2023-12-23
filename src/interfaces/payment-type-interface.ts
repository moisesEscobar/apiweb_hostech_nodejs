import { IPaymentTypeModel } from '../models/payment-type-model';

export interface IPaymentTypeService {
    findAll(): Promise<IPaymentTypeModel[]>;
    findOne(id: number): Promise<IPaymentTypeModel>;
    search(params: any): Promise<IPaymentTypeModel[]>;
    create(IPaymentTypeModel: IPaymentTypeModel): Promise<IPaymentTypeModel>;
    remove(id: number): Promise<any>;
    update(id: number,body: IPaymentTypeModel): Promise<any>;
    restore(id: number): Promise<any>;
}
