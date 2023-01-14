import { Sequelize } from 'sequelize';
import configDB from '../config/config.js';
const env = process.env.NODE_ENV || 'development';
const config = configDB[env];
let db;
if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: true, //false
    });
}
else {
    // the application is executed on the local machine
    db = new Sequelize(config.database, config.username, config.password, config);
}
export default db;
