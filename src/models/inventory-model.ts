import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

export interface IInventoryModel {
    id?: number;
    product_id?: number;
    quantity?: number;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}
class Inventory extends Model {
    public id: number;
    public product_id: number;
    public quantity: number;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
Inventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Inventory',
        tableName: 'inventories',
        timestamps: true, // enabled created_at y updated_at 
        paranoid: true, // enabled column deleted_at 
        underscored: true, // use snake_case ,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);
export default Inventory;
