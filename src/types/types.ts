export interface IHttpResponse {
    success: boolean
    statusCode: number
    message: string
    data?: unknown
    request: {
        ip?: string | null
        url: string
        method: string
    }
}

export interface IHttpError {
    success: boolean
    statusCode: number
    message: string
    data?: unknown
    request: {
        ip?: string | null
        url: string
        method: string
    }
    trace?: object | null
}
