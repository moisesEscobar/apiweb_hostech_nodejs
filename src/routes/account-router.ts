import { AccountComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/search', AccountComponent.search);
router.get('/find_one/:id', AccountComponent.findOne);
router.post('/create', AccountComponent.create);
router.put('/update/:id', AccountComponent.update);
//router.delete('/remove/:id', PaymentOrderComponent.remove);
//router.put('/restore/:id', PaymentOrderComponent.restore);

export default router;