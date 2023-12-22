import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const SaleView = sequelize.define('view_product_sales', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  product_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  key: DataTypes.STRING,
  brand_name: DataTypes.STRING,
  quantity_sold: DataTypes.INTEGER,
  total_amount: DataTypes.INTEGER,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default SaleView;