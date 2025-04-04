import { blue, gray, green, magenta, red, yellow } from 'colorette';
import path from 'path';
import * as sourceMapSupport from 'source-map-support';
import util from 'util';
import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import { MongoDBTransportInstance } from 'winston-mongodb';
import { getDatabaseURIWithDbName } from './database-url-formatter';

// Enable source map support
sourceMapSupport.install();

const colorizeLogLevel = (level: string): string => {
    switch (level) {
        case 'INFO':
            return blue(level);
        case 'WARN':
            return yellow(level);
        case 'ERROR':
            return red(level);
        default:
            return level;
    }
};

const customConsoleFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
    const customMeta = util.inspect(meta, { showHidden: false, depth: null, colors: true });
    const customTimeTimestamp = green(timestamp as string);
    return `${customTimeTimestamp} [${colorizeLogLevel(level.toUpperCase())}]: ${gray(message as string)}\n${customTimeTimestamp} [${magenta('META')}]: ${customMeta}`;
});

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    return [
        new transports.Console({
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss Z' // Customize the timestamp format
                }),
                customConsoleFormat
            )
        })
    ];
};

const customFileFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
    const logMeta: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(meta as Record<string, unknown>)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                stack: value.stack as string
            };
        } else {
            logMeta[key] = value;
        }
    }

    const logData = {
        level: level.toUpperCase(),
        message: message as string,
        timestamp: timestamp as string,
        meta: logMeta
    };
    return `${logData.timestamp} [${logData.level}]: ${logData.message}\n${logData.timestamp} [META]: ${JSON.stringify(logData.meta, null, 4)}`;
});

const fileTransport = (): Array<FileTransportInstance> => {
    if (config.env === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.File({
                filename: path.join(__dirname, `../../logs/${config.env}.log`),
                format: format.combine(
                    format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss Z' // Customize the timestamp format
                    }),
                    customFileFormat
                )
            })
        ];
    }
    return [];
};

const mongodbTransport = (): Array<MongoDBTransportInstance> => {
    const dbUrl = getDatabaseURIWithDbName(config);
    return [
        new transports.MongoDB({
            collection: 'application-logs',
            level: 'info',
            db: dbUrl,
            metaKey: 'meta',
            expireAfterSeconds: 60 * 60 * 24 * 15 // 15 days
        })
    ];
};

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...consoleTransport(), ...mongodbTransport(), ...fileTransport()]
});
