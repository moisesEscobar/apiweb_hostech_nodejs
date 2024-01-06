import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const SupplierView = sequelize.define('view_suppliers', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  type_user: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default SupplierView;