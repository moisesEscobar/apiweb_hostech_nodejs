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
  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
UserView.init({
    id: {type: DataTypes.INTEGER,primaryKey: true,},
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    second_surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  },
  {
    sequelize,
    modelName: 'UserView',
    tableName: 'view_users',
    timestamps: false,
    freezeTableName: true,
  }
);
export default UserView;
