import { TConfig } from '../config/config';
import { EApplicationEnvironment } from '../constant/application';

export const getDatabaseUrl = (config: TConfig, isWithDbName: boolean = false) => {
    const { db, env } = config;

    if (env === EApplicationEnvironment.PRODUCTION) {
        const userCredentials = `${db.user}:${db.password}`;
        return isWithDbName ? `${db.urlPrefix}${userCredentials}${db.url}${db.name}${db.urlSuffix}` : `${db.urlPrefix}${userCredentials}${db.url}${db.urlSuffix}`;
    }
    return `${db.urlPrefix}${db.url}/${db.name}${db.urlSuffix}`;
};

export const getAtlasURIWithDb = (config: TConfig) => {
    return getDatabaseUrl(config, true);
};
