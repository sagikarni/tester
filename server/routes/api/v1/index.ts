import { Router } from 'express';
import { users } from './users';
import { secure } from './secure';

const router = Router();

router.use('/users', users);
router.use('/secure', secure);

export { router as v1 };