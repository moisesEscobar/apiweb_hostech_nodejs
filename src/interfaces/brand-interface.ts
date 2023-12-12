import { IBrandModel } from '../models/brand-model';

export interface IBrandService {
    findAll(): Promise<IBrandModel[]>;
    findOne(id: number): Promise<IBrandModel>;
    search(params: any): Promise<IBrandModel[]>;
    create(IBrandModel: IBrandModel): Promise<IBrandModel>;
    remove(id: number): Promise<IBrandModel>;
    update(id: number,body: IBrandModel): Promise<void>;
    restore(id: number): Promise<IBrandModel>;
}
