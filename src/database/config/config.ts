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
    database: 'rick-morty',
    host: 'localhost',
    port: 5432,
    // username: 'postgres',
    // password: 'WeOfaeYfp6AfcGmILvV8',
    // database: 'railway',
    // host: 'containers-us-west-76.railway.app',
    // port: 6954,
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
    password: 'WeOfaeYfp6AfcGmILvV8',
    database: 'railway',
    host: 'containers-us-west-76.railway.app',
    port: 6954,
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
