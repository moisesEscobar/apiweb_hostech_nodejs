import * as express from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwtConfig from '../config/middleware/jwt-auth';
import AuthRouter from './auth-route';
import ProductRouter from './product-router';
import BrandRouter from './brand-router';
import LogRouter from './log-router';

export function init(app: express.Application): void {
	const router: express.Router = express.Router();

	// @description Forwards any requests to the /v1/users URI to our UserRouter, Also, check if user authenticated
    app.use('/auth', AuthRouter);
    app.use('/product', jwtConfig.isAuthenticated, ProductRouter);
    app.use('/brand', jwtConfig.isAuthenticated, BrandRouter);
    app.use('/log', jwtConfig.isAuthenticated, LogRouter);
    app.get('/', (req, res, next) => {
        return res.send('Api Web 🏓')
    });
    
	app.use((req, res, next) => {
        res.status(StatusCodes.BAD_REQUEST).send('Not Found!');
    });
	app.use(router);
}
