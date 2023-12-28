export interface IPaymentOrderService {
    findAll(): Promise<IPaymentOrderModel[]>;
    findOne(id: number): Promise<IPaymentOrderModel>;
    create(IPaymentOrderModel: IPaymentOrderModel): Promise<void>;
    remove(id: number): Promise<any>;
    update(id: number,body: IPaymentOrderModel): Promise<any>;
    restore(id: number): Promise<any>;
}

export interface IPaymentOrderModel {
    id?: number;
    shopping_id?: number;
    status?: string;
    payment_date?:Date,
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}