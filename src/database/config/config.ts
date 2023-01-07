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
    password: 'WeOfaeYfp6AfcGmILvV8',
    database: 'railway',
    host: 'containers-us-west-76.railway.app',
    port: 6954,
    // username: DatabaseConfig.DB_USER,
    // password: DatabaseConfig.DB_PASSWORD,
    // database: DatabaseConfig.DB_NAME,
    // host: DatabaseConfig.DB_HOST,
    // port: DatabaseConfig.DB_PORT,
    // dialect: DatabaseConfig.DB_DIALECT,
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
