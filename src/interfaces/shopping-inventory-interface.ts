export interface IShoppingInventoryService {
    findAll(): Promise<IShoppingInventoryModel[]>;
    create(IShoppingModel: IShoppingInventoryModel): Promise<void>;
}

export interface IShoppingInventoryModel {
    id?: number;
    product_id?: number;
    quantity?: number;
    unit_price?: number;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}