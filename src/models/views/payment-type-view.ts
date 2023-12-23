import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

const PymentTypeView = sequelize.define('view_payment_types', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  name: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default PymentTypeView;