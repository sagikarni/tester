import cors from 'cors';
import { Router } from 'express';
import { api } from './api';
import { storage } from './storage';

const router = Router();

router.use('/api', cors(), api);

router.use('/storage', storage);

export { router as routes };
