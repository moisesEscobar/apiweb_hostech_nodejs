import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.log('test ',err.message)
    // Verificamos si el error es de autenticación
    if ( (err.message === 'Unauthorized') || (err.message === 'NotToken')) {
        res.status(401).json({ error: 'Unauthorized' });
    }else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default errorHandler;