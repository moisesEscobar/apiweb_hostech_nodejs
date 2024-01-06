export interface IShoppingInventoryService {
    findAll(): Promise<IShoppingInventoryModel[]>;
    search(params: any): Promise<IShoppingInventoryModel[]>;
    findOne(id: number): Promise<IShoppingInventoryModel>;
    create(IShoppingModel: IShoppingInventoryCreateModel): Promise<void>;
}
export interface IShoppingInventoryModel {
    id?: number;
    product_id?: number;
    quantity?: number;
    unit_price?: number;
    products?: object;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}
export interface IShoppingInventoryCreateModel {
    date_purchase?: Date | null;
    supplier_id?: number;
    products:  {
        product_id: number;
        quantity: number;
    }[];
}