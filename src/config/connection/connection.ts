import { Sequelize } from 'sequelize';
import config from '../env/index';

const sequelize = new Sequelize(config.DATABASE_POSTGRES.DATABASE_URL+ "?sslmode=require",{
  logging: false,
});
export default sequelize;