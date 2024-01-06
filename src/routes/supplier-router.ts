import { SupplierComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', SupplierComponent.findAll);
router.get('/search', SupplierComponent.search);
router.get('/summary_shopings', SupplierComponent.summaryShopings);
router.get('/find_one/:id', SupplierComponent.findOne);
router.post('/create', SupplierComponent.create);
router.put('/update/:id', SupplierComponent.update);
router.delete('/remove/:id', SupplierComponent.remove);
router.put('/restore/:id', SupplierComponent.restore);

export default router;