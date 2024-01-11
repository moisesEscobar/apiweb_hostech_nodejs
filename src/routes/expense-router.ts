import { ExpenseComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();
router.post('/create', ExpenseComponent.create);
export default router;