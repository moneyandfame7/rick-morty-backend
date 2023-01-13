import { Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
export interface IConfigTs {
  development: Options;
  test: Options;
  production: Options;
}

const configDB: IConfigTs = {
  development: {
    username: `postgres`,
    password: `root`,
    database: `rick-morty`,
    host: `localhost`,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8',
    },
    define: {
      timestamps: false,
    },
    logging: false,
  },
  test: {
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    host: `${process.env.DB_HOST}`,
    port: 6954,
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8',
    },
    define: {
      timestamps: false,
    },
    logging: false,
  },
  production: {
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
    host: `${process.env.DB_HOST}`,
    port: 6954,
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8',
    },
    define: {
      timestamps: false,
    },
    logging: false,
  },
};
export default configDB;
