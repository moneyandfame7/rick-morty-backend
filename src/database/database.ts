import { Sequelize } from 'sequelize';
import { SyncOptions } from 'sequelize/types/sequelize.js';
import DatabaseConfig from '../config/database-config.js';

interface Setup {
  connect: () => Promise<void>;
}

export default class Database implements Setup {
  public db: Sequelize = new Sequelize(
    DatabaseConfig.configuration.database!,
    DatabaseConfig.configuration.username!,
    DatabaseConfig.configuration.password!,
    DatabaseConfig.configuration
  );

  public async connect(options?: SyncOptions) {
    await this.db.sync({ ...options });
    console.log('>> Connect to DB at: ', new Date().toLocaleTimeString());
  }

  public model(name: string) {
    return this.db.model(name);
  }
}

export const DataBaseInstance = new Database();
