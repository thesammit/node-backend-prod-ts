import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import { rateLimiterMongo } from '../config/rate-limiter';
import httpError from '../utils/http-error';
import { REQUEST_OVERFLOW } from '../constant/response-message';

export default (req: Request, _: Response, next: NextFunction): void => {
    if (config.env === EApplicationEnvironment.DEVELOPMENT) {
        return next();
    }

    if (rateLimiterMongo) {
        rateLimiterMongo
            .consume(req.ip as string, 1)
            .then(() => {
                next();
            })
            .catch(() => {
                httpError(next, { err: new Error(REQUEST_OVERFLOW), req, errorStatusCode: 429 });
            });
    }
};
