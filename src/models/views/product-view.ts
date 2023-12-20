import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

const ProductView = sequelize.define('view_products', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  name: DataTypes.STRING,
  key: DataTypes.STRING,
  brand_id: DataTypes.INTEGER,
  brand_name: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default ProductView;