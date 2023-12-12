import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';
import Brand from './brand-model';

export interface IProductModel {
    id?: number;
    name: string;
    key: string;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
    brand_id?: number;

}

class Product extends Model {
    public id: number;
    public name: string;
    public key: string;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
    // Definir relaciones, validaciones u otros métodos aquí
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
        key: {
            type: DataTypes.STRING,
            allowNull: false,
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
Product.belongsTo(Brand, { foreignKey: 'brand_id' });

export default Product;
