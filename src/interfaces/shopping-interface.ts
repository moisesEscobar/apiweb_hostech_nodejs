import { IShoppingModel } from '../models/shopping-model';

export interface IShoppingService {
    findAll(): Promise<IShoppingModel[]>;
    findOne(id: number): Promise<IShoppingModel>;
    create(IShoppingModel: IShoppingModel): Promise<IShoppingModel>;
    remove(id: number): Promise<any>;
    update(id: number,body: IShoppingModel): Promise<any>;
    restore(id: number): Promise<any>;
}
