import * as express from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwtConfig from '../config/middleware/jwt-auth';
import AuthRouter from './auth-route';
import ProductRouter from './product-router';
import BrandRouter from './brand-router';
import LogRouter from './log-router';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import InventoryRouter from './inventory-router';
import SupplierRouter from './supplier-router';
import SaleRouter from './sale-router';
import config from '../config/env/index';
import path from "path";

export function init(app: express.Application): void {
    const ext_file_api = (config.NODE_ENV=='production')?"api-doc.js":"api-doc.ts";
    const router: express.Router = express.Router();
    const swaggerSpec = {
        definition: {
            openapi: "3.0.0",
            info: { title: "Api web node js", version: "1.0.0" },
<<<<<<< Updated upstream
            servers: [{ url: "https://mem-hostech-7efd928b200f.herokuapp.com" },{ url: "http://127.0.0.1:3000" }],
        },
        apis: [`${path.join(__dirname, "api-doc.ts")}`],
=======
            servers: [{ url: config.HOST}],
        },
        apis: [`${path.join(__dirname, ext_file_api)}`],
>>>>>>> Stashed changes
    }
    app.get('/', (req, res, next) => { return res.send('Api Web 🏓') });
    app.use("/api_doc", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerSpec))); // swagger

    app.use('/auth', AuthRouter);
    app.use('/product', jwtConfig.isAuthenticated, ProductRouter);
    app.use('/brand', jwtConfig.isAuthenticated, BrandRouter);
    app.use('/log', jwtConfig.isAuthenticated, LogRouter);

    app.use('/supplier', jwtConfig.isAuthenticated, SupplierRouter);
    app.use('/sale', jwtConfig.isAuthenticated, SaleRouter);
    app.use('/inventory', jwtConfig.isAuthenticated, InventoryRouter);

    app.use((req, res, next) => {
        res.status(StatusCodes.BAD_REQUEST).json( {message: 'Not Found!'});
    });
    app.use(router);
}
