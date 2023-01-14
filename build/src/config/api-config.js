import pkg from 'env-var';
const { get } = pkg;
export default class ApiServerConfig {
    static PORT = get('API-PORT').required().default(3001).asPortNumber();
    static HOST = get('API-HOST').required().default('localhost').asString();
    static BASE_URL = get('BASE_URL').required().default('http://localhost:3001').asString();
}
