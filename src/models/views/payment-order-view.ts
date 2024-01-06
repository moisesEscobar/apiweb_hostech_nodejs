import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const PaymentOrderView = sequelize.define('view_payment_orders', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  status: DataTypes.STRING,
  total_amount: DataTypes.DOUBLE,
  payment_date: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  created_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});
export default PaymentOrderView;

/* const PaymentOrderView = sequelize.define('view_payment_orders_purchase', {
  payment_order_id: {type: DataTypes.INTEGER,primaryKey: true,},
  status: DataTypes.STRING,
  payment_date: DataTypes.DATE,
  shopping_id: DataTypes.INTEGER,
  inventory_id: DataTypes.INTEGER,
  unit_price: DataTypes.DOUBLE,
  supplier_customer_id: DataTypes.INTEGER,
  supplier_name: DataTypes.STRING,
  product_id: DataTypes.INTEGER,
  product_name: DataTypes.STRING,
  product_sku: DataTypes.STRING,
  brand_name: DataTypes.STRING,
  product_quantity: DataTypes.INTEGER,
  total_amount: DataTypes.DOUBLE
}, { timestamps: false ,freezeTableName: true}); */