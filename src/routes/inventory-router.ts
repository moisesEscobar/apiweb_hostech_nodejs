import { InventoryComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', InventoryComponent.findAll);
router.get('/find_one/:id', InventoryComponent.findOne);
router.post('/create', InventoryComponent.create);
router.put('/update/:id', InventoryComponent.update);
router.delete('/remove/:id', InventoryComponent.remove);
router.put('/restore/:id', InventoryComponent.restore);
export default router;