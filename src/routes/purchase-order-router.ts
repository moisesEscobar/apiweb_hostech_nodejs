import { PurchaseOrderComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', PurchaseOrderComponent.findAll);

export default router;