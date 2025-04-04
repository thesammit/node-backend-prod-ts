import { NOT_FOUND_FN } from './constant/response-message';
import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import router from './router/api-router';
import globalErrorHandler from './middleware/global-error-handler';
import httpError from './utils/http-error';
import helmet from 'helmet';
import cors from 'cors';
import config from './config/config';

const app: Application = express();

// middleware
app.use(helmet());
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        origin: [config.corsOrigin as string],
        credentials: true
    })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

// Not Found Route
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(NOT_FOUND_FN(req.originalUrl));
    } catch (err) {
        httpError(next, { err, req, errorStatusCode: 404 });
    }
});

// Global error handler
app.use(globalErrorHandler);

export default app;
