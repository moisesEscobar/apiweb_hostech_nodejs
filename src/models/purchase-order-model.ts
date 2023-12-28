import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

export interface IPurchaseOrderModel {
    shopping_id?: number;
    payment_order_id?: number;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}

class PurchaseOrder extends Model {
    public shopping_id: number;
    public payment_order_id: number;
    public unit_price: number;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
PurchaseOrder.init(
    {
        shopping_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        payment_order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
        modelName: 'PurchaseOrder',
        tableName: 'purchase_orders',
        timestamps: true,
        paranoid: true, 
        underscored: true, 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

export default PurchaseOrder;
