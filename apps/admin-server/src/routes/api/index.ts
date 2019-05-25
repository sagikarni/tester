import { Router } from 'express';

const router = Router();

router.all('/', (req, res) => {
  console.log('in /api');
  res.json({ ok: true });
});

export { router as api };
