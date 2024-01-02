import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

interface RequestFile extends Request {
    file_validation_error: object | string;
}

// Función para filtrar y permitir solo ciertos tipos de archivos
const fileFilter = (req: RequestFile, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if (!file) { // El archivo no es requerido, pasar null para no generar un error
        cb(null, false);
    } else if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar archivo
    } else {// Pasar un error si el archivo no tiene un formato permitido
        req.file_validation_error="Formato de archivo no permitido";
        cb(null, false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../storage'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, 'product_' + file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadStoarge = multer({ 
    storage: storage,
    fileFilter: fileFilter // Añade aquí el filtro de archivos
});

export default uploadStoarge;
