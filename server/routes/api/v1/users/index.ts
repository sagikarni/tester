import { Router } from 'express';

import { register } from '@modules/auth';

const router = Router();

router.post('/', register, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

export { router as users };
