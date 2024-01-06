import { SaleComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/search', SaleComponent.findAll);
router.get('/find_one/:id', SaleComponent.findOne);
router.post('/create', SaleComponent.create);
router.put('/update/:id', SaleComponent.update);
router.delete('/remove/:id', SaleComponent.remove);
router.put('/restore/:id', SaleComponent.restore);
export default router;