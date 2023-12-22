import { ProductComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', ProductComponent.findAll);
router.get('/find_one/:id', ProductComponent.findOne);
router.get('/search', ProductComponent.search);
router.post('/create', ProductComponent.create);
router.put('/update/:id', ProductComponent.update);
router.delete('/remove/:id', ProductComponent.remove);
router.put('/restore/:id', ProductComponent.restore);
router.get('/report_resume', ProductComponent.reportResume);

export default router;