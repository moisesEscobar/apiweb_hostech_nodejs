import { Sequelize } from 'sequelize';
import config from '../env/index';

//const ssl = (config.NODE_ENV=='production')?"?sslmode=require":"";
/* const sequelize = new Sequelize(config.DATABASE_POSTGRES.DATABASE_URL+ssl,{
  dialect: 'postgres',
  logging: false
}); */
const ssl= (config.NODE_ENV=='production')?true:false;
const sequelize = new Sequelize(config.DATABASE_POSTGRES.POSTGRES_DATABASE, config.DATABASE_POSTGRES.POSTGRES_USER, config.DATABASE_POSTGRES.POSTGRES_PASSWORD, {
  host: config.DATABASE_POSTGRES.POSTGRES_HOST,
  dialect: 'postgres',
  logging: false,
  dialectOptions: { ssl: ssl}
});
export default sequelize;
