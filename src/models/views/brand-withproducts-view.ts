
import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const BrandWithProductView = sequelize.define('view_brands_with_products', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  name: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default BrandWithProductView;