import ServerApplication from './server-application.js';
import db from '../database/models/index.js';
async function runApplication() {
    await db.authenticate();
    console.log('>> Connect to DB at: ', new Date().toLocaleString());
    await ServerApplication.run();
}
(async () => {
    await runApplication();
    console.log('Server started and DB connection established');
})();
