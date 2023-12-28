import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

const ShoppingView = sequelize.define('view_shoppings', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  inventory_id: DataTypes.INTEGER,
  unit_price: DataTypes.DOUBLE,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default ShoppingView;