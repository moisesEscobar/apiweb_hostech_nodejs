
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../storage'))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        cb(null, 'product_'+file.fieldname + '_' + uniqueSuffix + path.extname(file.originalname));
    }
});
const uploadStoarge = multer({ storage: storage });
export default uploadStoarge;
