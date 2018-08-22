import { Router } from 'express';

import { login, confirmEmail, refreshToken, sendConfirm, resetPassword, newPassword } from '@modules/auth';

const router = Router();

router.post('/login', login, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/confirm', confirmEmail, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/reconfirm', sendConfirm, (req, res, next) => {
  res.sendStatus(200);
});

router.post('/reset-password', resetPassword, (req, res, next) => {
  res.sendStatus(200);
});

router.post('/new-password', newPassword, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});


router.post('/refresh', refreshToken, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

export { router as token };
