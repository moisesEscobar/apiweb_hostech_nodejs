import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

export interface ISaleModel {
    id?: number;
    product_id?: number;
    quantity?: number;
    total_amount?: number;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}
class Sale extends Model {
    public id: number;
    public product_id: number;
    public quantity: number;
    public total_amount: number;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
Sale.init(
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
            allowNull: false
        },
        total_amount: {
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
        modelName: 'Sale',
        tableName: 'product_sales',
        timestamps: true, // enabled created_at y updated_at 
        paranoid: true, // enabled column deleted_at 
        underscored: true, // use snake_case ,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

export default Sale;
