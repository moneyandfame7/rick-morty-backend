import dotenv from 'dotenv';
import { Options } from 'sequelize';

dotenv.config();

interface IConfigTs {
  development: Options;
  test: Options;
  production: Options;
}

const configDB: IConfigTs = {
  development: {
    username: 'postgres',
    password: 'root',
    database: 'test',
    host: 'localhost',
    port: 5432,
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // host: process.env.DB_HOST,
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
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8',
    },
    define: {
      timestamps: false,
    },
  },
  production: {
    username: 'postgres',
    password: '9w5K1y6toGC4Ypi0QVdP',
    database: 'railway',
    host: 'containers-us-west-43.railway.app',
    port: 6298,
    dialect: 'postgres',
    dialectOptions: {
      charset: 'utf8',
      multipleStatements: true,
    },
    logging: false,
    define: {
      timestamps: false,
    },
  },
};
export default configDB;
