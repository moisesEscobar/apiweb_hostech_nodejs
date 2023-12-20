import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const LogView = sequelize.define('view_logs', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  action: DataTypes.STRING,
  catalog: DataTypes.STRING,
  detail_last: DataTypes.STRING,
  detail_new: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
  user_name: DataTypes.STRING,
  user_last_name: DataTypes.STRING,
  user_email: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default LogView;