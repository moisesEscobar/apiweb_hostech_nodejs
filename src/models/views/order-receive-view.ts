import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const OrderReceiveView = sequelize.define('view_orders_receive', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  supplier_customer_id: DataTypes.INTEGER,
  total_amount: DataTypes.DOUBLE,
  date_order: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  created_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});
export default OrderReceiveView;

