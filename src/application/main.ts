import ServerApplication from './server-application.js';
import db from '../database/models/index.js';

async function runApplication() {
  await db.sync({ force: false });
  console.log('>> Connect to DB at: ', new Date().toLocaleString());

  await ServerApplication.run();
}

(async (): Promise<void> => {
  await runApplication();

  console.log('Server started and DB connection established');
})();
