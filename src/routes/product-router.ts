//import multer from "multer";
//import path from "path";
import uploadStoarge from '../config/storage/multer';
import { ProductComponent } from '../components';
import { Router } from 'express';
//const uploadStoarge = multer({ dest: path.join(__dirname, '/') });

const router: Router = Router();
router.get('/find_all', ProductComponent.findAll);
router.get('/find_one/:id', ProductComponent.findOne);
router.get('/search', ProductComponent.search);
router.post('/create', uploadStoarge.single('file'),ProductComponent.create);
router.put('/update/:id', ProductComponent.update);
router.delete('/remove/:id', ProductComponent.remove);
router.put('/restore/:id', ProductComponent.restore);
router.get('/report_resume', ProductComponent.reportResume);

export default router;