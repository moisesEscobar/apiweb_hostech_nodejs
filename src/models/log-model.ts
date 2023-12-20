import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection/connection';
import User from './user-model';

export interface ILogModel {
    id?: number;
    action: string;
    catalog: string;
    user_id?: number;
    detail_last?:string,
    detail_new?:string
}

class Log extends Model {
    public id: number;
    public action: string;
    public catalog: string;
    public updated_at: Date;
    public created_at: Date;
    public deleted_at: Date;
    public detail_last: string;
    public detail_new: string;
    // Definir relaciones, validaciones u otros métodos aquí
}
Log.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        catalog: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
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
        detail_last: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        detail_new: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Log',
        tableName: 'logs',
        timestamps: true, // enabled created_at y updated_at 
        paranoid: true, // enabled column deleted_at 
        underscored: true, // use snake_case ,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);

Log.belongsTo(User, { foreignKey: 'user_id' });

export default Log;
