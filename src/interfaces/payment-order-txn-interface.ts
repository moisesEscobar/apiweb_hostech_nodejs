import { IPaymentOrderTxnModel } from '../models/payment-order-txn-model';

export interface IPaymentOrderTxnService {
    findAll(): Promise<IPaymentOrderTxnModel[]>;
    findOne(id: number): Promise<IPaymentOrderTxnModel>;
    create(IPaymentOrderTxnModel: IPaymentOrderTxnModel): Promise<IPaymentOrderTxnModel>;
    remove(id: number): Promise<any>;
    update(id: number,body: IPaymentOrderTxnModel): Promise<any>;
    restore(id: number): Promise<any>;
}
