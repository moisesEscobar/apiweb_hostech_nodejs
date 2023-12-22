import { Sequelize } from 'sequelize';
import config from '../env/index';

//const ssl = (config.NODE_ENV=='production')?"?sslmode=require":"";
/* const sequelize = new Sequelize(config.DATABASE_POSTGRES.DATABASE_URL+ssl,{
  dialect: 'postgres',
  logging: false
}); */
const ssl= (config.NODE_ENV=='production')?true:false;
const sequelize = new Sequelize('verceldb', 'default', 'Ug4aSABKVc7f', {
  host: 'ep-sparkling-tree-24352510-pooler.us-east-1.postgres.vercel-storage.com',
  dialect: 'postgres',
  logging: false,
  dialectOptions: { ssl: ssl}
});
export default sequelize;
