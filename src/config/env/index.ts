import * as dotenv from 'dotenv';
dotenv.config();

interface IConfig { 
    PORT: string | number;
    DATABASE_POSTGRES:{
        DATABASE_URL: string
    },
    SECRET: string
}
const NODE_ENV: string = process.env.NODE_ENV || 'production';

const development: IConfig = {
    PORT: process.env.PORT || 3000,
    DATABASE_POSTGRES:{
        DATABASE_URL:process.env.POSTGRES_URL
    },
    SECRET:process.env.SECRET
};
const production: IConfig = {
    PORT: process.env.PORT || 3000,
    DATABASE_POSTGRES:{
        DATABASE_URL:process.env.POSTGRES_URL
    },
    SECRET:process.env.SECRET
};
const config: {[name: string]: IConfig} = {development,production};
export default config[NODE_ENV];