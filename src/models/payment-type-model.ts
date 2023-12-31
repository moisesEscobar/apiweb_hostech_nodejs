import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

export interface IPaymentTypeModel {
    id?: number;
    name?: string;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}

class PaymentType extends Model {
    public id: number;
    public name: string;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
    // Definir relaciones, validaciones u otros métodos aquí
}
PaymentType.init(
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
        modelName: 'PaymentType',
        tableName: 'payment_types',
        timestamps: true, // enabled created_at y updated_at 
        paranoid: true, // enabled column deleted_at 
        underscored: true, // use snake_case ,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

export default PaymentType;
