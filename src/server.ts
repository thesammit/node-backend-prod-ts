import config from './config/config';
import app from './app';
import logger from './utils/logger';
import databaseService from './service/database-service';
import { initRateLimiter } from './config/rate-limiter';

const server = app.listen(config.port);
let connection = null;

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    try {
        //database connection
        connection = await databaseService.connect();

        logger.info(`DATABASE_CONNECTED`, {
            meta: {
                connectionName: connection.name,
                connectionHost: connection.host,
                connectionPort: connection.port
            }
        });

        initRateLimiter(connection);

        logger.info(`RATE_LIMITER_INITIATED`);

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

        if (connection) {
            await databaseService.disconnect(connection);
        }

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
