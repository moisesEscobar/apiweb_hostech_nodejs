import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    if ( (err.message === 'Unauthorized') || (err.message === 'NotToken') || (err.message === 'Forbidden')) {
        res.status(err.subcode).json({ 
            subcode: err.subcode,
            error: err.message 
        });
    }else {
        res.status(500).json({ 
            subcode: 500,
            error: 'Internal Server Error' 
        });
    }
}
export default errorHandler;