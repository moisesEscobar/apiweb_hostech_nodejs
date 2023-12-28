import { ShoppingComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', ShoppingComponent.findAll);
router.get('/find_one/:id', ShoppingComponent.findOne);
router.post('/create', ShoppingComponent.create);
router.put('/update/:id', ShoppingComponent.update);
router.delete('/remove/:id', ShoppingComponent.remove);
router.put('/restore/:id', ShoppingComponent.restore);

export default router;