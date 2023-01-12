import pkg from 'env-var';

const { get } = pkg;

export default class ApiServerConfig {
  public static readonly PORT: number = get('API-PORT').required().default(3001).asPortNumber();

  public static readonly HOST: string = get('API-HOST').required().default('localhost').asString();

  public static readonly BASE_URL: string = get('BASE_URL').required().default('http://localhost:3001/api').asString();
}
