import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const SaleView = sequelize.define('view_products_sales_summary', {
  //view_product_sales
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  //product_id: DataTypes.INTEGER,
  //name: DataTypes.STRING,
  //sku: DataTypes.STRING,
  //brand_name: DataTypes.STRING,
  supplier_customer_id: DataTypes.INTEGER,
  date_sale: DataTypes.DATE,
  quantity_products: DataTypes.INTEGER,
  amount_payable: DataTypes.DOUBLE,
  total_amount: DataTypes.INTEGER,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default SaleView;
