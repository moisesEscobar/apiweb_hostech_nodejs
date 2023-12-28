import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';

const PurchaseOrderView = sequelize.define('view_purchase_orders', {
  shopping_id: {type:DataTypes.INTEGER,primaryKey: true},
  payment_order_id: {type:DataTypes.INTEGER,primaryKey: true},
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  deleted_at: DataTypes.DATE
}, { timestamps: false ,freezeTableName: true});

export default PurchaseOrderView;