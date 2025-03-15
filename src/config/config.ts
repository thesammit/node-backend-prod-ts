import dotenvFlow from 'dotenv-flow';
import { env } from 'process';
import { EApplicationEnvironment } from '../constant/application';

dotenvFlow.config();

const config = {
    env: (env.NODE_ENV as EApplicationEnvironment) || EApplicationEnvironment.DEVELOPMENT,
    host: env.HOST || 'localhost',
    port: env.PORT || 3000,
    jwtSecret: env.JWT_SECRET,
    serverUrl: env.SERVER_URL,
    apiKey: env.API_KEY,
    atlasAPIPublicKey: env.ATLAS_API_PUBLIC_KEY,
    atlasAPIPrivateKey: env.ATLAS_API_PRIVATE_KEY,
    logLevel: env.LOG_LEVEL || 'info',
    db: {
        urlPrefix: env.DB_URL_PREFIX,
        url: env.DB_URL,
        urlSuffix: env.DB_URL_SUFFIX,
        name: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASSWORD
    }
};

export default config;
export type TConfig = typeof config;
