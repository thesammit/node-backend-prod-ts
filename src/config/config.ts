import dotenvFlow from 'dotenv-flow';
import { env } from 'process';
import { EApplicationEnvironment } from '../constant/application';

dotenvFlow.config();

export default {
    env: (env.NODE_ENV as EApplicationEnvironment) || EApplicationEnvironment.DEVELOPMENT,
    host: env.HOST || 'localhost',
    port: env.PORT || 3000,
    jwtSecret: env.JWT_SECRET,
    serverUrl: env.SERVER_URL,
    apiKey: env.API_KEY,
    logLevel: env.LOG_LEVEL || 'info',
    db: {
        url: env.DB_URL,
        name: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASSWORD
    }
};
