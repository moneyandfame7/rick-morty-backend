import { DataBaseInstance } from '../database/database.js';
import ServerApplication from './server-application.js';

// check dependency injection
async function runApplication() {
  const serverApplication = new ServerApplication();

  await DataBaseInstance.connect();
  serverApplication.run();
}

(async (): Promise<void> => {
  await runApplication();
})();
