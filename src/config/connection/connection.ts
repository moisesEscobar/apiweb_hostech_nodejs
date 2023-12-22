import { Sequelize } from 'sequelize';
import config from '../env/index';

const ssl = (config.NODE_ENV=='production')?"?sslmode=require":"";
const sequelize = new Sequelize(config.DATABASE_POSTGRES.DATABASE_URL+ssl,null,null{
  logging: false,
});
export default sequelize;