import { Router } from 'express';

import {
  register,
  login,
  verifyAccount,
  refreshToken,
  sendVerifyNotification,
  recoverAccount,
  verifyPassword,
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

router.post('/verify', verifyAccount, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post('/notify-verify', sendVerifyNotification, (req, res, next) => {
  res.sendStatus(200);
});

router.post('/recover-account', recoverAccount, (req, res, next) => {
  res.sendStatus(200);
});

router.post('/verify-password', verifyPassword, (req, res, next) => {
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
