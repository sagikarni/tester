import { Router } from 'express';

import { register, login, confirmEmail, refreshToken, sendConfirm, resetPassword, newPassword } from '@libs/auth';

const router = Router();

router.post('/', register, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/login', login, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/confirm', sendConfirm, (req, res, next) => {
  res.sendStatus(200);
});

router.post('/confirmed', confirmEmail, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
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

export { router as users };
