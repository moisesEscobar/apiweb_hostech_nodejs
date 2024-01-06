import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

const ProductWithInventoryView = sequelize.define('view_products_with_inventory', {
  product_id: {type: DataTypes.INTEGER,primaryKey: true},
  supplier_customer_id: DataTypes.INTEGER,
  supplier_name: DataTypes.STRING,
  product_name: DataTypes.STRING,
  product_sku: DataTypes.STRING,
  brand_id: DataTypes.INTEGER,
  brand_name: DataTypes.STRING,
  product_price: DataTypes.DOUBLE,
  product_reorder_point: DataTypes.INTEGER,
  quantity_sold: DataTypes.INTEGER,
  total_quantity: DataTypes.INTEGER,
  quantity_available: DataTypes.INTEGER,
  total_amount_sold: DataTypes.DOUBLE
}, { timestamps: false ,freezeTableName: true});

export default ProductWithInventoryView;

