import { LogComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/find_all', LogComponent.findAll);

export default router;