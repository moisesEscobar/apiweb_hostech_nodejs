import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

class PaymentOrder extends Model {
    public id: number;
    public status: string;
    public payment_date: Date;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
PaymentOrder.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {isIn: [['pending', 'process','completed','failed','cancelled','refunded','verifying','rejected']]},
        },
        payment_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
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
        modelName: 'PaymentOrder',
        tableName: 'payment_orders',
        timestamps: true, 
        paranoid: true, 
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

export default PaymentOrder;
