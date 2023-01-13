import { Sequelize } from 'sequelize';
import { Options } from 'sequelize';
import configDB from '../config/config.js';

const env: string = process.env.NODE_ENV || 'development';

const config: Options = configDB[env as keyof typeof configDB];

const db: Sequelize = new Sequelize(
  'postgresql://postgres:WeOfaeYfp6AfcGmILvV8@containers-us-west-76.railway.app:6954/railway',
  config
);

export default db;
