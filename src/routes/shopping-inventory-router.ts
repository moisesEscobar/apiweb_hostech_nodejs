import { ShoppingInventoryComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', ShoppingInventoryComponent.findAll);
router.post('/create', ShoppingInventoryComponent.create);

export default router;