import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const InventoryView = sequelize.define('view_inventories', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  supplier_id: DataTypes.INTEGER,
  supplier_name: DataTypes.STRING,
  product_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  key: DataTypes.STRING,
  brand_name: DataTypes.STRING,
  quantity: DataTypes.INTEGER,
  price: DataTypes.DOUBLE,
  reorder_point: DataTypes.INTEGER,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default InventoryView;