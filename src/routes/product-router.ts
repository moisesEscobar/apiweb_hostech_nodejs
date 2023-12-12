import { ProductComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/findAll', ProductComponent.findAll);
router.get('/findOne/:id', ProductComponent.findOne);
router.get('/search', ProductComponent.search);
router.post('/create', ProductComponent.create);
router.put('/update/:id', ProductComponent.update);
router.delete('/remove/:id', ProductComponent.remove);
router.put('/restore/:id', ProductComponent.restore);

export default router;