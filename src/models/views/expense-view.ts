import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const ExpenseView = sequelize.define('view_accounts', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  payment_order_id: DataTypes.INTEGER,
  account_id: DataTypes.INTEGER,
  amount: DataTypes.DOUBLE,
  updated_at: DataTypes.DATE,
  created_at: DataTypes.DATE 
}, { timestamps: false ,freezeTableName: true});
export default ExpenseView;