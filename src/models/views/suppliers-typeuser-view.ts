
import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const SupplierTypesUserView = sequelize.define('view_suppliers_types_user', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  name: DataTypes.STRING,
  type_user: DataTypes.STRING,
  can_be: DataTypes.STRING
}, { timestamps: false ,freezeTableName: true});

export default SupplierTypesUserView;