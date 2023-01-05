import { Sequelize } from 'sequelize';
import configDB from './../config/config.js';
const env = process.env.NODE_ENV || 'development';
const config = configDB[env];
const db = new Sequelize(config.database, config.username, config.password, config);
export default db;
//# sourceMappingURL=index.js.map