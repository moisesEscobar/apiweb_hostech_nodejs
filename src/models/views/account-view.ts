import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const AccountView = sequelize.define('view_accounts', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  account_name: DataTypes.STRING,
  initial_balance: DataTypes.DOUBLE,
  balance: DataTypes.DOUBLE,
  incomes: DataTypes.DOUBLE,
  expenses: DataTypes.DOUBLE,
  total: DataTypes.DOUBLE,
  //payment_date: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  created_at: DataTypes.DATE 
}, { timestamps: false ,freezeTableName: true});
export default AccountView;