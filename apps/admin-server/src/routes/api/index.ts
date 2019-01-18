import { Router } from 'express';
import { v1 } from './v1';

const router = Router();

router.all('/', (req, res) => {
  console.log('in /api');
  res.json({ ok: true });
});

router.use('/v1', v1);

export { router as api };
