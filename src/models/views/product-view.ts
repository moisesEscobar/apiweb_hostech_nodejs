import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

class ProductView extends Model { }

ProductView.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER
    },
    brand_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'ProductView',
    tableName: 'view_all_products',
    timestamps: false,
    freezeTableName: true,
  }
);

export default ProductView;


