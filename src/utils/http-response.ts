import { Request, Response } from 'express'
import config from '../config/config'
import { EApplicationEnvironment } from '../constant/application'

export default (responseData: { req: Request; res: Response; responseCode: number; data?: unknown; message: string }): void => {
    const { req, res, responseCode, data, message } = responseData
    const response = {
        success: true,
        statusCode: responseCode,
        message,
        data: data || null,
        request: {
            ip: req.ip || null,
            url: req.url,
            method: req.method
        }
    }

    // log the response
    // eslint-disable-next-line no-console
    console.info('Controller response', {
        meta: {
            response
        }
    })

    if (config.env === EApplicationEnvironment.PRODUCTION) {
        response.request.ip = null
    }

    res.status(responseCode).json(response)
}
