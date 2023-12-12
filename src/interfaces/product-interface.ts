import { IProductModel } from '../models/product-model';

export interface IProductService {
    findAll(): Promise<IProductModel[]>;
    findOne(id: number): Promise<IProductModel>;
    search(params: any): Promise<IProductModel[]>;
    create(IProductModel: IProductModel): Promise<IProductModel>;
    remove(id: number): Promise<IProductModel>;
    update(id: number,body: IProductModel): Promise<void>;
    restore(id: number): Promise<IProductModel>;
}
