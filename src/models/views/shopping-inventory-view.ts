import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

const ShoppingInventoryView = sequelize.define('view_shoppings_inventories', {
  shopping_id: {type: DataTypes.INTEGER,primaryKey: true,},
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
}, { timestamps: false ,freezeTableName: true});

export default ShoppingInventoryView;