import { IncomeComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.get('/search', IncomeComponent.search);
router.post('/create', IncomeComponent.create);
export default router;