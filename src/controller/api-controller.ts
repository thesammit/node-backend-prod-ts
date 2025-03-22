import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/http-response';
import { SUCCESS_MESSAGE } from '../constant/response-message';
import httpError from '../utils/http-error';
import { getApplicationHealth, getSystemHealth } from '../utils/server-health';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse({ req, res, responseCode: 200, message: SUCCESS_MESSAGE });
        } catch (err) {
            httpError(next, { err, req, errorStatusCode: 500 });
        }
    },
    health: (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = {
                application: getApplicationHealth(),
                system: getSystemHealth(),
                timeStamp: Date.now()
            };
            httpResponse({ req, res, responseCode: 200, message: SUCCESS_MESSAGE, data: healthData });
        } catch (err) {
            httpError(next, { err, req, errorStatusCode: 500 });
        }
    }
};
