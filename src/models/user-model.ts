import { DataTypes, Model } from 'sequelize';
import {hash} from 'bcrypt';
import sequelize from '../config/connection/connection';

export interface IUserModel {
    id: number;
    name: string;
    last_name: string;
    second_surname: string;
    phone_number?: string;
    email: string;
    password: string;
    updated_at?:Date,
    created_at?:Date,
    deleted_at?:Date,
}

export interface IUserModelRegistry{
    name: string;
    last_name: string;
    second_surname: string;
    phone_number: string;
    email: string;
    password: string;
}

class User extends Model {
    public id: number;
    public name: string;
    public last_name: string;
    public second_surname: string;
    public phone_number: string;
    public email: string;
    public password: string;

    // Method to encrypt the password before saving it
    public async encryptPassword(): Promise<void> {
        const saltRounds = 10;
        this.password = await hash(this.password, saltRounds);
    }
}
User.init(
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
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        second_surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // timestamps
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
        modelName: 'User',
        tableName: 'users',
        timestamps: true, // enabled created_at y updated_at 
        paranoid: true, // enabled column deleted_at 
        underscored: true, // use snake_case 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    }
);



export default User;
