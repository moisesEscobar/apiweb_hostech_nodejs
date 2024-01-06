import { ILogModel } from '../models/log-model';

export interface ILogService {
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<ILogModel>;
    search(params: any): Promise<ILogModel[]>;
    create(ILogModel: ILogModel): Promise<any>;
}
