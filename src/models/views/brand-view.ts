import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/connection/connection';
import { IBrandModel } from '../brand-model'; // Asegúrate de importar la interfaz

class BrandView extends Model<IBrandModel> {
  public id: number;
  public name: string;
  public updated_at: Date;
  public created_at: Date;
  public deleted_at: Date;
}

BrandView.init(
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
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
  {
    sequelize, 
    modelName: 'BrandView',
    tableName: 'view_all_brands', // nombre de la vista en la base de datos
    timestamps: false, 
    freezeTableName: true,
  }
);
export default BrandView;




