import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

export interface IShoppingModel {
    id?: number;
    inventory_id?: number;
    unit_price?: number;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}

class Shopping extends Model {
    public id: number;
    public inventory_id: number;
    public unit_price: number;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
Shopping.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        inventory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.DOUBLE,
            allowNull: false
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
        modelName: 'Shopping',
        tableName: 'shoppings',
        timestamps: true,
        paranoid: true, 
        underscored: true, 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

export default Shopping;
