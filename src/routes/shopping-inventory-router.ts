import { ShoppingInventoryComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', ShoppingInventoryComponent.findAll);
router.get('/search', ShoppingInventoryComponent.search);
router.post('/create', ShoppingInventoryComponent.create);
router.get('/find_one/:id', ShoppingInventoryComponent.findOne);

export default router;