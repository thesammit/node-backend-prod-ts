import { NextFunction, Request } from 'express'
import errorObject from './error-object'

export default (
    nextFunction: NextFunction,
    errorDetails: {
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        err: Error | unknown
        req: Request
        errorStatusCode: number
    }
): void => {
    const { err, req, errorStatusCode } = errorDetails
    const errObject = errorObject({ err, req, errorStatusCode })
    nextFunction(errObject)
}
