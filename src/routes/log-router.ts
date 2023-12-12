import { LogComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/findAll', LogComponent.findAll);

export default router;