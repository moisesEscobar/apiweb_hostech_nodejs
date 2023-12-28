import { DataTypes } from 'sequelize';
import sequelize from '../../config/connection/connection';

const PaymentOrderTxnView = sequelize.define('view_payment_order_txns', {
  id: {type: DataTypes.INTEGER,primaryKey: true,},
  status: DataTypes.STRING,
  amount: DataTypes.DOUBLE,
  user_id: DataTypes.INTEGER,
  payment_type_id: DataTypes.INTEGER,
  payment_order_id: DataTypes.INTEGER,
  supplier_customer_id: DataTypes.INTEGER,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default PaymentOrderTxnView;