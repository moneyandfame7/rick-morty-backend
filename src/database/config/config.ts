import { Options } from 'sequelize';

export interface IConfigTs {
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
    username: 'postgres',
    password: 'root',
    database: 'rick-morty',
    host: 'localhost',
    port: 5432,
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
    password: 'root',
    database: 'rick-morty',
    host: 'localhost',
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
};
export default configDB;
