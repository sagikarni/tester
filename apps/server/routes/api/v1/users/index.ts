import { Router } from "express";

import {
  changePassword,
  disconnectFromSocial,
  login,
  recoverAccount,
  refreshToken,
  register,
  sendVerifyNotification,
  verifyAccount,
  verifyPassword,
} from "@libs/auth-node";

const router = Router();

router.post("/", register, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post("/login", login, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post("/verify", verifyAccount, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post("/notify-verify", sendVerifyNotification, (req, res, next) => {
  res.sendStatus(200);
});

router.post("/recover-account", recoverAccount, (req, res, next) => {
  res.sendStatus(200);
});

router.post("/verify-password", verifyPassword, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post("/password", changePassword, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post("/refresh", refreshToken, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

router.post("/social", disconnectFromSocial, (req, res, next) => {
  const { user } = req;

  res.json(user.toJSON());
});

export { router as users };
