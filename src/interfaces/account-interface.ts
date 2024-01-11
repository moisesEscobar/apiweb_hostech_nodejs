export interface IAccountService {
    search(params: any): Promise<IAccountModel[]>;
    findOne(id: number): Promise<IAccountModel>;
    create(IAccountModel: IAccountModel): Promise<void>;
    remove(id: number): Promise<any>;
    update(id: number,body: IAccountModel): Promise<any>;
    restore(id: number): Promise<any>;
}

export interface IAccountModel {
    id?: number;
    initial_balance?: number;
    account_name?: string;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}

export interface IAccountViewModel {
    id?: number;
    initial_balance?: number;
    balance?: number;
    incomes?: number;
    expenses?: number;
    account_name?: string;
    updated_at?:Date,
    created_at?:Date
}


export interface IAccountCreateModel {
    payment_date?: Date | null;
    supplier_id?: number;
    status?: string;
    shoppings:  {
        shopping_id: number;
        amount: number;
    }[];
}