import { ISupplierModel } from '../models/supplier-model';

export interface ISupplierService {
    findAll(): Promise<ISupplierModel[]>;
    findOne(id: number): Promise<ISupplierModel>;
    create(ISupplierModel: ISupplierModel): Promise<ISupplierModel>;
    remove(id: number): Promise<any>;
    update(id: number,body: ISupplierModel): Promise<any>;
    restore(id: number): Promise<any>;
}
