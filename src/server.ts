import config from './config/config';
import app from './app';
import logger from './utils/logger';

const server = app.listen(config.port);

(() => {
    try {
        //database connection

        logger.info(`APPLICATION_STARTED`, {
            meta: {
                port: config.port,
                serverUrl: config.serverUrl
            }
        });
    } catch (error) {
        logger.error(`APPLICATION_ERROR`, {
            meta: {
                port: config.port,
                serverUrl: config.serverUrl
            },
            error
        });

        server.close(() => {
            logger.info(`SERVER_CLOSED`, {
                meta: {
                    port: config.port,
                    serverUrl: config.serverUrl
                }
            });
        });
        process.exit(1);
    }
})();
