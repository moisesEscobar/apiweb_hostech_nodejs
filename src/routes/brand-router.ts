import { BrandComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/findAll', BrandComponent.findAll);
router.get('/findOne/:id', BrandComponent.findOne);
router.get('/search', BrandComponent.search);
router.post('/create', BrandComponent.create);
router.put('/update/:id', BrandComponent.update);
router.delete('/remove/:id', BrandComponent.remove);
router.put('/restore/:id', BrandComponent.restore);

export default router;