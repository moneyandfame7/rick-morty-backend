import dotenv from 'dotenv';
dotenv.config();
const configDB = {
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
