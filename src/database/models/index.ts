import { Sequelize } from 'sequelize';
import { Options } from 'sequelize';
import configDB from '../config/config.js';

const env: string = process.env.NODE_ENV || 'development';

const config: Options = configDB[env as keyof typeof configDB];

const db: Sequelize = new Sequelize('railway', 'postgres', 'WeOfaeYfp6AfcGmILvV8', {
  host: 'containers-us-west-76.railway.app',
  port: 6954,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default db;
