export interface IExpenseService {
    create(IExpenseModel: IExpenseModel): Promise<any>;
}

export interface IExpenseModel {
    id?: number;
    user_id?:number;
    payment_order_id?: number;
    account_id?: number;
    amount?: number;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}