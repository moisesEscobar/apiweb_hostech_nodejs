export interface IPaymentOrderService {
    findAll(params: any): Promise<IPaymentOrderModel[]>;
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

export interface IPaymentOrderCreateModel {
    payment_date?: Date | null;
    supplier_id?: number;
    status?: string;
    shoppings:  {
        shopping_id: number;
        amount: number;
    }[];
}