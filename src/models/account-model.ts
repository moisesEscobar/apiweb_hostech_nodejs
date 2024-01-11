import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';

class Account extends Model {
    public id: number;
    public account_name: string;
    public initial_balance: number;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
}
Account.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        account_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        initial_balance: {
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
        modelName: 'Account',
        tableName: 'accounts',
        timestamps: true, 
        paranoid: true, 
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

export default Account;
