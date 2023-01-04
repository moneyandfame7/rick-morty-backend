import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import router from './api/routers/index.js';
import characterRouter from './api/routers/character.router.js';
import episodeRouter from './api/routers/episode.router.js';
import locationRouter from './api/routers/location.router.js';
const app = express();
const port = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/api', router);
app.use('/api', characterRouter);
app.use('/api', episodeRouter);
app.use('/api', locationRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map