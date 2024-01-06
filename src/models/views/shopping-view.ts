import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

const ShoppingsView = sequelize.define('view_shoppings_summary', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  supplier_customer_id: DataTypes.INTEGER,
  quantity_products: DataTypes.INTEGER,
  total_amount_purchase: DataTypes.DOUBLE,
  date_purchase: DataTypes.DATE,
  amount_payable: DataTypes.DOUBLE,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default ShoppingsView;
