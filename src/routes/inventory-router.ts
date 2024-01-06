import { InventoryComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/search', InventoryComponent.search);
router.get('/find_one/:id', InventoryComponent.findOne);
export default router;