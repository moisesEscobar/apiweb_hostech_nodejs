import { PaymentOrderComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/search', PaymentOrderComponent.findAll);
router.get('/find_one/:id', PaymentOrderComponent.findOne);
router.post('/create', PaymentOrderComponent.create);
router.put('/update/:id', PaymentOrderComponent.update);
router.delete('/remove/:id', PaymentOrderComponent.remove);
router.put('/restore/:id', PaymentOrderComponent.restore);

export default router;