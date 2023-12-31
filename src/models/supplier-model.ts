import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

export interface ISupplierModel {
    id?: number;
    name?: string;
    phone_number?: string;
    address?: string;
    type_user?: string;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}
class Supplier extends Model {
    public id: number;
    public name: string;
    public phone_number: string;
    public type_user: string;
    public address: string;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
Supplier.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        type_user: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {isIn: [['supplier', 'customer']]},
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
        modelName: 'Supplier',
        tableName: 'suppliers_customers',
        timestamps: true, // enabled created_at y updated_at 
        paranoid: true, // enabled column deleted_at 
        underscored: true, // use snake_case ,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);
export default Supplier;
