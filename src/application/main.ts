import Database from '../database/database.js';
import ServerApplication from './server-application.js';

(async (): Promise<void> => {
  await runApplication();
})();

async function runApplication() {
  const serverApplication = new ServerApplication();

  const db = new Database();

  db.connect().then(() => {
    serverApplication.run();
  });
}
