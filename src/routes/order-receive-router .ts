import { OrderReceiveComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/search', OrderReceiveComponent.search);
router.post('/create', OrderReceiveComponent.create);
router.get('/find_one/:id', OrderReceiveComponent.findOne);
export default router;