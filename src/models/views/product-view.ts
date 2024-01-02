import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

const ProductView = sequelize.define('view_products', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  name: DataTypes.STRING,
  sku: DataTypes.STRING,
  brand_id: DataTypes.INTEGER,
  price: DataTypes.DOUBLE,
  brand_name: DataTypes.STRING,
  path_file:DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default ProductView;