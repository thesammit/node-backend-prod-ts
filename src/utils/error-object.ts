import { Request } from 'express';
import { ERROR_MESSAGE } from '../constant/response-message';
import { IHttpError } from '../types/types';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';

export default (errorData: {
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    err: Error | unknown;
    req: Request;
    errorStatusCode: number;
    message?: string;
}): IHttpError => {
    const { err, req, errorStatusCode = 500, message } = errorData;
    let errorMessage = '';
    if (err instanceof Error) {
        errorMessage = err.message;
    }
    const errorResponse: IHttpError = {
        success: false,
        statusCode: errorStatusCode,
        message: errorMessage || message || ERROR_MESSAGE,
        data: null,
        request: {
            ip: req.ip || null,
            url: req.url,
            method: req.method
        },
        trace: err instanceof Error ? { error: err.stack } : null
    };

    // log the response
    // eslint-disable-next-line no-console
    console.error('Controller Error', {
        meta: errorResponse
    });

    if (config.env === EApplicationEnvironment.PRODUCTION) {
        errorResponse.request.ip = undefined;
        errorResponse.trace = undefined;
    }

    return errorResponse;
};
