import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';
import Brand from './brand-model';

export interface IProductModel {
    id?: number;
    name: string;
    sku: string;
    path_file: string;
    description?: Text;
    supplier_customer_id?: number;
    reorder_point?: number;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
    brand_id?: number;
    price?: number;
}

class Product extends Model {
    public id: number;
    public name: string;
    public sku: string;
    public path_file: string;
    public description: Text;
    public supplier_customer_id: number;
    public reorder_point: number;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
Product.init(
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
        path_file: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        sku: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        },
        reorder_point: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        supplier_customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER
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
        modelName: 'Product',
        tableName: 'products',
        timestamps: true, // enabled created_at y updated_at 
        paranoid: true, // enabled column deleted_at 
        underscored: true, // use snake_case ,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);
//Product.belongsTo(Brand, { foreignKey: 'brand_id' });

export default Product;
