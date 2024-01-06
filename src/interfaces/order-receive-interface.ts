export interface IOrderReceiveService {
    search(params: any): Promise<IOrderReceiveModel[]>;
    findOne(id: number): Promise<IOrderReceiveModel>;
    create(IOrderReceiveModel: IOrderReceiveModel): Promise<void>;
}

export interface IOrderReceiveModel {
    id?: number;
    supplier_customer_id?: number;
    total_amount?: number;
    date_order?:Date,
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}

export interface IOrderReceiveCreateModel {
    date_order?: Date | null;
    customer_id?: number;
    sales:  {
        product_sale_id: number;
        amount: number;
    }[];
}