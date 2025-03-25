import mongoose, { Connection, ConnectOptions } from 'mongoose';
import config from '../config/config';
import { getDatabaseUrl } from '../utils/database-url-formatter';
import logger from '../utils/logger';

mongoose.set('strictQuery', false);

export default {
    connect: async () => {
        try {
            const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
            const url = getDatabaseUrl(config);
            await mongoose.connect(url, clientOptions);
            return mongoose.connection;
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Error connecting to database: ${err}`);
        }
    },
    disconnect: async (connection: Connection) => {
        try {
            await connection.close(true);
            logger.info(`DATABASE_DISCONNECTED`, {
                meta: {
                    connectionName: connection.name,
                    connectionHost: connection.host,
                    connectionPort: connection.port
                }
            });
        } catch (err) {
            logger.error(`DATABASE_DISCONNECTION`, {
                meta: {
                    port: config.port,
                    serverUrl: config.serverUrl,
                    err
                }
            });
        }
    }
};
