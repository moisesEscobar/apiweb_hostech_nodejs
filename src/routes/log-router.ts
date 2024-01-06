import { LogComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', LogComponent.findAll);
router.get('/find_one/:id', LogComponent.findOne);
router.get('/search', LogComponent.search);

export default router;