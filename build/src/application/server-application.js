import express from 'express';
import logger from 'morgan';
import errorHandler from './middlewares/error-handler.js';
import episodesRouter from './routes/episodes-router.js';
import charactersRouter from './routes/characters-router.js';
import mainRouter from './routes/main-router.js';
import locationsRouter from './routes/locations-router.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
class ServerApplication {
    port = process.env.PORT || 3001;
    app = express();
    setup() {
        this.app.set('view engine', 'pug');
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        /* routes */
        this.app.use('/api', mainRouter);
        this.app.use('/api', episodesRouter);
        this.app.use('/api', charactersRouter);
        this.app.use('/api', locationsRouter);
        /* middlewares */
        this.app.use((req, res) => {
            res.send({
                error: {
                    message: 'There is nothing here.',
                },
            });
        });
        this.app.use(errorHandler);
    }
    log() {
        console.log(`>> Server started >>http://localhost:${this.port}/api`);
    }
    async run() {
        this.setup();
        await this.app.listen(this.port);
        this.log();
    }
}
export default new ServerApplication();
