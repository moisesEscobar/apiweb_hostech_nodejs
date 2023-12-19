import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';
import {compare} from 'bcrypt';

export interface IUserViewModel {
  id: number;
  name: string;
  last_name: string;
  second_surname: string;
  email: string;
  password: string;
  updated_at?:Date,
  created_at?:Date,
  deleted_at?:Date,
  comparePassword: (password: string) => Promise<boolean>;
}

class UserView extends Model {
  public id: number;
    public name: string;
    public last_name: string;
    public second_surname: string;
    public email: string;
    public password: string;

  // Method for comparing the encrypted password with an unencrypted password
  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}

UserView.init(
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
    modelName: 'UserView',
    tableName: 'view_all_users',
    timestamps: false,
    freezeTableName: true,
  }
);

export default UserView;