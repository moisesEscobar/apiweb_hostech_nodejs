import { IInventoryModel } from '../models/inventory-model';

export interface IInventoryService {
    findAll(): Promise<IInventoryModel[]>;
    findOne(id: number): Promise<IInventoryModel>;
    create(IInventoryModel: IInventoryModel): Promise<IInventoryModel>;
    remove(id: number): Promise<any>;
    update(id: number,body: IInventoryModel): Promise<any>;
    restore(id: number): Promise<any>;
}
