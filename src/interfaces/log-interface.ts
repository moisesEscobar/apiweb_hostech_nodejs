import { ILogModel } from '../models/log-model';

export interface ILogService {
    findAll(): Promise<any[]>;
    create(ILogModel: ILogModel): Promise<any>;
}
