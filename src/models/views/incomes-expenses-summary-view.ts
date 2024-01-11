import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

const   IncomesExpensesSummaryView = sequelize.define('view_incomes_expense_summary', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  supplier_name: DataTypes.STRING,
  type_user: DataTypes.STRING,
  account_name: DataTypes.STRING,
  order_id: DataTypes.NUMBER,
  account_id: DataTypes.NUMBER,
  supplier_customer_id: DataTypes.NUMBER,
  amount: DataTypes.NUMBER,
  type: DataTypes.STRING,
  date_order: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default IncomesExpensesSummaryView;
