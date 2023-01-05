import { Sequelize } from 'sequelize';
import { Options } from 'sequelize';
import configDB from './../config/config.js';
import * as pg from 'pg';

const env: string = process.env.NODE_ENV || 'development';

const config: Options = configDB[env as keyof typeof configDB];

const db: Sequelize = new Sequelize(config.database!, config.username!, config.password, {
  ...config,
  dialectModule: pg,
});

export default db;
