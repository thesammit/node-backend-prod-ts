import { Connection } from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';

const MAX_NO_OF_REQUEST = 10;
const DURATION_OF_LIMITER = 60;

export let rateLimiterMongo: null | RateLimiterMongo = null;

export const initRateLimiter = (mongooseConnection: Connection) => {
    rateLimiterMongo = new RateLimiterMongo({
        storeClient: mongooseConnection,
        points: MAX_NO_OF_REQUEST,
        duration: DURATION_OF_LIMITER
    });
};
