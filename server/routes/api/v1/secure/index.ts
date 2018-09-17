import { Router } from 'express';

import { authenticate } from '@libs/auth';

const router = Router();

router.all('/', authenticate, (req, res, next) => {
  const { user } = req;

  res.json({ msg: 'this is secure data', user: user.toJSON() });
});

export { router as secure };
