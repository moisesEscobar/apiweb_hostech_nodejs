export interface IIncomeService {
    create(IIncomeModel: IIncomeModel): Promise<any>;
    search(params: any): Promise<any[]>;
}

export interface IIncomeModel {
    id?: number;
    user_id?: number,
    order_receive_id?: number;
    account_id?: number;
    amount?: number;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}