import { IProductModel } from '../models/product-model';

export interface IProductService {
    findAll(): Promise<IProductModel[]>;
    findOne(id: number): Promise<IProductModel>;
    search(params: any): Promise<IProductModel[]>;
    create(IProductModel: IProductModel): Promise<IProductModel>;
    update(id: number,body: IProductModel): Promise<any>;
    remove(id: number): Promise<any>;
    restore(id: number): Promise<any>;
}
