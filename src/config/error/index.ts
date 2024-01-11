import * as http from 'http';
import {error_messages, error_messages_joi} from '../../constans/messages-errors';
import { Response, NextFunction } from 'express';
import config from '../env/index';
import Joi from 'joi';



function getErrorMessage(error_key: string,code:number=400) {
    const language = config.LENGUAGE;
    const error = error_messages[error_key];
    if (error) {
        return {
            message: error.messages[language] || error.messages.en,
            code: error.code
        };
    } else {
        return {
            message: error_key,
            code: code // Un código por defecto, si no se encuentra el error_key
        };
    }
}

class HttpError extends Error {
    subcode: number;
    message: string;
    constructor(status ? : number, message ? : string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.subcode = status || 500;
        this.name = 'HttpError';
        this.message = message || http.STATUS_CODES[this.subcode] || 'Error';
    }
}
class ErrorRate extends Error {
    code: number;
    constructor(error_key: string, code: number = 400) {
        const error_info  = getErrorMessage(error_key,code);
        super(error_info.message);
        Error.captureStackTrace(this, this.constructor);
        this.code = error_info.code;
        this.name = 'ErrorRate';
        this.message = error_info.message;
    }
}

function handleRouteError(error: any, res: Response, next: NextFunction) {
    if (error.code === 500) {
        return next(new HttpError(error.message.status, error.message));
    }
    res.json({
        subcode: error.code,
        message: error.message
    });
}

function errorJoiValidations(schema: Joi.Schema): Joi.Schema {
    if (config.LENGUAGE_JOI) {
        return schema.messages(error_messages_joi[config.LENGUAGE]);
    }
    return schema;
}

export {HttpError,ErrorRate,handleRouteError,errorJoiValidations} ;