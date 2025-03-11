import { createLogger, format, transports } from 'winston';
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';
import util from 'util';
import path from 'path';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';

const customConsoleFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
    const customMeta = util.inspect(meta, { showHidden: false, depth: null });
    return `${timestamp as string} [${level.toUpperCase()}]: ${message as string}\n${timestamp as string} [META]: ${customMeta}`;
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

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...consoleTransport(), ...fileTransport()]
});
