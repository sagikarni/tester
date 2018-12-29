import { Router } from 'express';

import { authenticate } from 'auth-node';

const router = Router();

router.all('/', authenticate, (req, res, next) => {
  const { user } = req as any;

  res.json({ msg: 'this is secure data', user: user.toJSON() });
});

export { router as secure };
