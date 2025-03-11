/* eslint-disable no-console */
import config from './config/config';
import app from './app';

const server = app.listen(config.port);

(() => {
    try {
        console.info(`Application started`, {
            meta: {
                port: config.port,
                serverUrl: config.serverUrl
            }
        });
    } catch (error) {
        console.error(`Application failed to start`, {
            meta: {
                port: config.port,
                serverUrl: config.serverUrl
            },
            error
        });

        server.close(() => {
            console.info(`Server closed`, {
                meta: {
                    port: config.port,
                    serverUrl: config.serverUrl
                }
            });
        });
        process.exit(1);
    }
})();
