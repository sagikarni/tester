import { AppHttpError, async } from 'express-zone';
import { User } from '../../mongodb';

import {
  sendWelcome,
  sendVerify,
  sendVerification,
  sendResetPassword,
  sendPasswordChanged,
} from '../../../../auth-node/src/email/index';

import { generateToken } from './token';

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).populate('role');
  if (!user) {
    throw new AppHttpError(400, 'NOT_EXIST');
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    throw new AppHttpError(400, 'INVALID_PASSWORD');
  }

  const token = await generateToken({
    _id: user._id,
    hsh: user.password,
    grant: 'access',
  });

  return { token, user };
};

export const register = async ({ name, email, password }) => {
  let user = await User.findOne({ email });
  if (user) {
    throw new AppHttpError(400, 'EXIST');
  }

  user = await new User({ email, name, password }).save();

  await sendWelcome({ emailTo: user.email, password, fullname: user.name });

  const verifyToken = await generateToken({
    _id: user._id,
    hsh: user.password,
    grant: 'verify',
  });

  if (!user.verified) {
    sendVerify({ emailTo: user.email, token: verifyToken });
  }

  const token = await generateToken({
    _id: user._id,
    hsh: user.password,
    grant: 'access',
  });

  return { token, user, verifyToken };
};

export const recoverAccount = async ({ email }) => {
  let user = await User.findOne({ email });
  if (!user) {
    throw new AppHttpError(400, 'NOTEXIST');
  }
  const token = await generateToken({
    _id: user._id,
    hsh: user.password,
    grant: 'password',
  });

  await sendResetPassword({ emailTo: user.email, token });

  return { token };
};

export const verifyAccount = async ({ user }) => {
  user.verified = true;
  await user.save();

  await sendVerification({ emailTo: user.email, fullname: user.name });

  const token = await generateToken({
    _id: user._id,
    hsh: user.password,
    grant: 'access',
  });

  return { token, user };
};

export const reverifyAccount = async ({ user }) => {
  const verifyToken = await generateToken({
    _id: user._id,
    hsh: user.password,
    grant: 'verify',
  });

  if (!user.verified) {
    sendVerify({ emailTo: user.email, token: verifyToken });
  }
};

export const changePassword = async ({ password, user }) => {
  user.password = password;
  await user.save();

  sendPasswordChanged({ emailTo: user.email, password, fullname: user.name });

  const token = await generateToken({
    _id: user._id,
    hsh: user.password,
    grant: 'access',
  });

  return { token, user };
};
