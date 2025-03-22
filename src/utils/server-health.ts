import { totalmem, freemem, loadavg } from 'os';
import { uptime, memoryUsage } from 'process';
import config from '../config/config';

const BYTE_TO_MEGA_BYTE = 1024 * 1024;

export const getSystemHealth = () => {
    return {
        cpuUsage: loadavg(),
        totalMemory: `${(totalmem() / BYTE_TO_MEGA_BYTE).toFixed(2)} MB`,
        freeMemory: `${(freemem() / BYTE_TO_MEGA_BYTE).toFixed(2)} MB`
    };
};

export const getApplicationHealth = () => {
    return {
        environment: config.env,
        uptime: `${uptime().toFixed(2)} Seconds`,
        memoryUsage: {
            heapTotal: `${(memoryUsage().heapTotal / BYTE_TO_MEGA_BYTE).toFixed(2)} MB`,
            heapUsed: `${(memoryUsage().heapUsed / BYTE_TO_MEGA_BYTE).toFixed(2)} MB`
        }
    };
};
