import { Router } from 'express';
import { search } from './search';
import { users } from './users';

const router = Router();


router.use('/search', search);
router.use('/users', users);
// router.use('/secure', secure);
// router.use('/oauth2', oauth2);

export { router as v1 };