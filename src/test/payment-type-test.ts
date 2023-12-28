import { findAll } from '../components/payment-type-component';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/request'
import * as dotenv from 'dotenv';
import config from 'src/config/env/index';
dotenv.config();

process.env.NODE_ENV = 'test';

describe('findAll function', () => {
    it('should handle the request and return payment types', async () => {
        // Crear mocks para req, res, next
        const req = { user: { id: 1 } } as RequestWithUser;
        const res = {
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn() as NextFunction;

        // Llamada a la función findAll
        await findAll(req, res, next);

        // Verificar que res.json se llamó con la respuesta esperada
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 200,
            message: 'Get payment_types successfull'
        }));
    });

    // Aquí puedes añadir más casos de prueba
});
