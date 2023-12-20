import { AuthComponent } from '../components';
import { Router } from 'express';

const router: Router = Router();

router.post('/login', AuthComponent.login);
router.post('/signup', AuthComponent.signup);
export default router;