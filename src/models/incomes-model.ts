import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

class Income extends Model {
    public id: number;
    public order_receive_id: number;
    public account_id: number;
    public amount: number;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
Income.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_receive_id: {
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
        modelName: 'Income',
        tableName: 'incomes',
        timestamps: true, 
        paranoid: true, 
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

export default Income;
