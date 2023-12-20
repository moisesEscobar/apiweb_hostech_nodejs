import { BrandComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', BrandComponent.findAll);
router.get('/find_all_with_products', BrandComponent.findAllWithProducts);
router.get('/find_one/:id', BrandComponent.findOne);
router.get('/search', BrandComponent.search);
router.post('/create', BrandComponent.create);
router.put('/update/:id', BrandComponent.update);
router.delete('/remove/:id', BrandComponent.remove);
router.put('/restore/:id', BrandComponent.restore);

export default router;