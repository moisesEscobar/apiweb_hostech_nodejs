import { PaymentTypeComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', PaymentTypeComponent.findAll);
router.get('/find_one/:id', PaymentTypeComponent.findOne);
router.post('/create', PaymentTypeComponent.create);
router.put('/update/:id', PaymentTypeComponent.update);
router.delete('/remove/:id', PaymentTypeComponent.remove);
router.put('/restore/:id', PaymentTypeComponent.restore);

export default router;