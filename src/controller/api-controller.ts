import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/http-response';
import { SUCCESS_MESSAGE } from '../constant/response-message';
import httpError from '../utils/http-error';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse({ req, res, responseCode: 200, message: SUCCESS_MESSAGE });
        } catch (err) {
            httpError(next, { err, req, errorStatusCode: 500 });
        }
    }
};
