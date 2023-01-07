import pkg from 'env-var';
import { Dialect, Options } from 'sequelize/types/index.js';
import configDB from '../database/config/config.js';

const { get } = pkg;

export default class DatabaseConfig {
  public static readonly env: string = get('NODE_ENV').default('development').asString();

  public static readonly DB_HOST: string = get('DB_HOST').required().default('localhost').asString();

  public static readonly DB_PORT: number = get('DB_PORT').required().default(5432).asPortNumber();

  public static readonly DB_USER: string = get('DB_USER').required().default('postgres').asString();

  public static readonly DB_PASSWORD: string = get('DB_PASSWORD').required().default('root').asString();

  public static readonly DB_NAME: string = get('DB_NAME').required().default('rick-morty').asString();

  public static readonly DB_DIALECT = get('DB_DIALECT').required().default('postgres').asString() as Dialect;

  public static readonly configuration: Options = configDB[this.env as keyof typeof configDB];
}
