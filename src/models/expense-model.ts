import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

class Expense extends Model {
    public id: number;
    public payment_order_id: number;
    public account_id: number;
    public amount: number;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        payment_order_id: {  
            type: DataTypes.INTEGER,
            allowNull: true
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
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
        modelName: 'Expense',
        tableName: 'expenses',
        timestamps: true, 
        paranoid: true, 
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

export default Expense;
