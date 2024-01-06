import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

const ShoppingsSuppliersSumaryViewView = sequelize.define('view_shoppings_suppliers_summary', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  name: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  address: DataTypes.STRING,
  //type_user: DataTypes.STRING,
  total_products: DataTypes.INTEGER,
  total_amount_purchase: DataTypes.DOUBLE,
  total_amount_paid: DataTypes.DOUBLE,
  amount_payable: DataTypes.DOUBLE,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default ShoppingsSuppliersSumaryViewView;
