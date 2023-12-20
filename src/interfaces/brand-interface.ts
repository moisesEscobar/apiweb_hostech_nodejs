import { IBrandModel } from '../models/brand-model';

export interface IBrandService {
    findAll(): Promise<IBrandModel[]>;
    findAllWithProducts(): Promise<IBrandModel[]>;
    findOne(id: number): Promise<IBrandModel>;
    search(params: any): Promise<IBrandModel[]>;
    create(IBrandModel: IBrandModel): Promise<IBrandModel>;
    remove(id: number): Promise<any>;
    update(id: number,body: IBrandModel): Promise<any>;
    restore(id: number): Promise<any>;
}
