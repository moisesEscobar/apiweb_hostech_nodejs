import { ISaleModel } from '../models/sale-model';

export interface ISaleService {
    findAll(params: any): Promise<ISaleModel[]>;
    findOne(id: number): Promise<ISaleModel>;
    create(ISaleModel: ISaleCreateModel): Promise<any>;
    remove(id: number): Promise<any>;
    update(id: number,body: ISaleModel): Promise<any>;
    restore(id: number): Promise<any>;
}

export interface ISaleCreateModel {
    date_sale?: Date | null;
    customer_id?: number;
    products:  {
        product_id: number;
        quantity: number;
    }[];
}