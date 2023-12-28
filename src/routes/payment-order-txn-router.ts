import { PaymentOrderTxnComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', PaymentOrderTxnComponent.findAll);
router.get('/find_one/:id', PaymentOrderTxnComponent.findOne);
router.post('/create', PaymentOrderTxnComponent.create);
router.put('/update/:id', PaymentOrderTxnComponent.update);
router.delete('/remove/:id', PaymentOrderTxnComponent.remove);
router.put('/restore/:id', PaymentOrderTxnComponent.restore);

export default router;