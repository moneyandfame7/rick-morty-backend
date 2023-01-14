import ServerApplication from './server-application';
import db from '../database/models';

async function runApplication() {
  await db.authenticate();
  console.log('>> Connect to DB at: ', new Date().toLocaleString());

  await ServerApplication.run();
}

(async (): Promise<void> => {
  await runApplication();

  console.log('Server started and DB connection established');
})();
