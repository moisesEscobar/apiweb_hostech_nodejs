import { IPurchaseOrderModel } from '../models/purchase-order-model';

export interface IPurchaseOrderService {
    findAll(): Promise<IPurchaseOrderModel[]>;
    findOne(id: number): Promise<IPurchaseOrderModel>;
    create(IPurchaseOrderModel: IPurchaseOrderModel): Promise<IPurchaseOrderModel>;
    remove(id: number): Promise<any>;
    update(id: number,body: IPurchaseOrderModel): Promise<any>;
    restore(id: number): Promise<any>;
}
