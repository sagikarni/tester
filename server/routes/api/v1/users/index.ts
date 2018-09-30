import { Router } from 'express';

import {
  register,
  login,
  confirmAccount,
  refreshToken,
  sendConfirmNotification,
  recoverAccount,
  confirmPassword,
  disconnectFromSocial,
  changePassword
} from '@libs/auth';

const router = Router();

router.post('/', register, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/login', login, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/confirm', confirmAccount, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/notify-confirm', sendConfirmNotification, (req, res, next) => {
  res.sendStatus(200);
});

router.post('/recover-account', recoverAccount, (req, res, next) => {
  res.sendStatus(200);
});

router.post('/confirm-password', confirmPassword, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/password', changePassword, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/refresh', refreshToken, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/social', disconnectFromSocial, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

export { router as users };
