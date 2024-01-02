import * as dotenv from 'dotenv';
dotenv.config();

interface IConfig { 
    HOST: string,
    NODE_ENV: string,
    PORT: string | number;
    DATABASE_POSTGRES:{
        DATABASE_URL: string,
        POSTGRES_USER: string,
        POSTGRES_HOST: string,
        POSTGRES_PASSWORD: string,
        POSTGRES_DATABASE: string
    },
    SECRET: string,
}
const NODE_ENV: string = process.env.NODE_ENV || 'production';

const development: IConfig = {
    HOST: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    DATABASE_POSTGRES:{
        DATABASE_URL:process.env.POSTGRES_URL,
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE
    },
    SECRET:process.env.SECRET,
    
};
const production: IConfig = {
    HOST: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    DATABASE_POSTGRES:{
        DATABASE_URL:process.env.POSTGRES_URL,
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE
    },
    SECRET:process.env.SECRET
};
const test: IConfig = {
    HOST: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 3000,
    DATABASE_POSTGRES:{
        DATABASE_URL:process.env.POSTGRES_URL,
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DATABASE: process.env.POSTGRES_DATABASE
    },
    SECRET:process.env.SECRET
};
const config: {[name: string]: IConfig} = {development,production,test};
export default config[NODE_ENV];