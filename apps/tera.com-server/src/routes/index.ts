import cors from 'cors';
import { Router } from 'express';
import { api } from './api';
import { auth } from './auth';
import { storage } from './storage';

const router = Router();

router.use('/api', cors(), api);

router.use('/auth', auth);

router.use('/storage', storage);

export { router as routes };
