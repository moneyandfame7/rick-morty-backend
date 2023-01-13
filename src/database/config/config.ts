import { Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export interface IConfigTs {
  development: Options;
  test: Options;
  production: any;
}

const configDB: IConfigTs = {
  development: {
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
    logging: true,
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
    logging: true,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
export default configDB;
