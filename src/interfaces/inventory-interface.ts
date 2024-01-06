import { IInventoryModel } from '../models/inventory-model';

export interface IInventoryService {
    search(params: any): Promise<IInventoryModel[]>;
    findOne(id: number): Promise<IInventoryModel>;
}
