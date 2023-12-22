import { ISaleModel } from '../models/sale-model';

export interface ISaleService {
    findAll(): Promise<ISaleModel[]>;
    findOne(id: number): Promise<ISaleModel>;
    create(ISaleModel: ISaleModel): Promise<any>;
    remove(id: number): Promise<any>;
    update(id: number,body: ISaleModel): Promise<any>;
    restore(id: number): Promise<any>;
}
