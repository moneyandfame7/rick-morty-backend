import dotenv from 'dotenv';
dotenv.config();
const configDB = {
    development: {
        username: 'postgres',
        password: 'root',
        database: 'test',
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
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
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
//# sourceMappingURL=config.js.map