import config from './config/config';
import app from './app';
import logger from './utils/logger';
import databaseService from './service/database-service';

const server = app.listen(config.port);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    try {
        //database connection
        const connection = await databaseService.connect();

        logger.info(`DATABASE_CONNECTED`, {
            meta: {
                connectionName: connection.name,
                connectionHost: connection.host,
                connectionPort: connection.port
            }
        });

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
                serverUrl: config.serverUrl,
                error
            }
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
