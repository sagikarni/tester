import cors from 'cors';
import { Router } from 'express';
import { api } from './api';
import { auth } from './auth';

const router = Router();

router.use('/api', cors(), api);
router.use('/access', auth);

export { router as routes };
