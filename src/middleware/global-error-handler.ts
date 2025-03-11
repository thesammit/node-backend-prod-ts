import { NextFunction, Request, Response } from 'express'
import { IHttpError } from '../types/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: IHttpError, _: Request, res: Response, __: NextFunction): void => {
    res.status(err.statusCode).json(err)
}
