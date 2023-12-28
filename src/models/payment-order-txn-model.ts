import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

export interface IPaymentOrderTxnModel {
    id?: number;
    status?: string;
    amount?: number;
    user_id?: number;
    payment_type_id?: number;
    payment_order_id?: number;
    supplier_customer_id?: number;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}

class PaymentOrderTxn extends Model {
    public id: number;
    public status: string;
    public amount: number;
    public user_id: number;
    public payment_type_id: number;
    public payment_order_id: number;
    public supplier_customer_id?: number;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
PaymentOrderTxn.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {isIn: [['pending', 'process','completed','failed','cancelled','refunded','verifying','rejected']]},
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        payment_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payment_order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        supplier_customer_id: {
            type: DataTypes.INTEGER,
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
        modelName: 'PaymentOrderTxn',
        tableName: 'payment_order_txns',
        timestamps: true, 
        paranoid: true, 
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

export default PaymentOrderTxn;
