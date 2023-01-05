import { Sequelize } from 'sequelize';
import configDB from './../config/config.js';
import * as pg from 'pg';
const env = process.env.NODE_ENV || 'development';
const config = configDB[env];
const db = new Sequelize(config.database, config.username, config.password, {
    ...config,
    dialectModule: pg,
});
export default db;
//# sourceMappingURL=index.js.map