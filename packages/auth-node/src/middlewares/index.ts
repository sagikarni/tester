import { pick } from 'lodash';
import { User } from '../database';
import * as jwt from 'jsonwebtoken';
import { compose, async, asyncAll, AppHttpError } from 'express-zone';
import { get } from 'lodash';
import {
  sendWelcome,
  sendVerify,
  sendVerification,
  sendResetPassword,
  sendPasswordChanged,
} from '../email';

export const register = asyncAll([
  createUser((req) => req.body),
  sendWelcomeEmail({ getUser: (req) => req.user }),
  sendEmailVerifyAccount({ getUser: (req) => req.user }),
  token(),
]);

export const login = asyncAll([authenticateUser((req) => req.body), token()]);

export const verifyAccount = asyncAll([
  validateToken({ headerKey: 'Basic', grant: 'verify' }),
  verifyUser({ getUser: (req) => req.user }),
  sendEmailVerification({ getUser: (req) => req.user }),
  token(),
]);

export const sendVerifyNotification = asyncAll([
  validateToken({ headerKey: 'Bearer', grant: 'access' }),
  sendEmailVerifyAccount({ getUser: (req) => req.user }),
]);

export const authenticate = asyncAll([
  validateToken({ headerKey: 'Bearer', grant: 'access' }),
  token(),
]);

export const refreshToken = asyncAll([
  validateToken({ headerKey: 'Basic', grant: 'refresh' }),
  token(),
]);

export const recoverAccount = asyncAll([
  findUser((req) => req.body),
  sendResetPasswordEmail({ getUser: (req) => req.user }),
]);

export const verifyPassword = asyncAll([
  validateToken({ headerKey: 'Basic', grant: 'reset' }),
  setNewPassword({
    getUser: (req) => req.user,
    getPassword: (req) => req.body.password,
  }),
  sendPasswordChangedEmail({
    getUser: (req) => req.user,
    getPassword: (req) => req.body.password,
  }),
  token(),
]);

export const disconnectFromSocial = asyncAll([
  validateToken({ headerKey: 'Bearer', grant: 'access' }),
  disconnectFrom({
    getUser: (req) => req.user,
    getVendor: (req) => req.body.vendor,
  }),
  token(),
]);

export const changePassword = asyncAll([
  validateToken({ headerKey: 'Bearer', grant: 'access' }),
  setUserPassword({
    getUser: (req) => req.user,
    getOldPassword: (req) => req.body.oldPassword,
    getPassword: (req) => req.body.password,
  }),
  sendPasswordChangedEmail({
    getUser: (req) => req.user,
    getPassword: (req) => req.body.password,
  }),
  token(),
]);

export const registerWithSocial = compose([
  ...asyncAll([
    createUser((req) => req.body),
    sendWelcomeEmail({ getUser: (req) => req.user }),
    updateUserFromSocial({
      getUser: (req) => req.user,
      getSocialResponse: (req) => req.strategyResponse,
    }),
    token(),
  ]),
]);

export const loginWithSocial = compose([
  ...asyncAll([
    authenticateUser((req) => req.body),
    updateUserFromSocial({
      getUser: (req) => req.user,
      getSocialResponse: (req) => req.strategyResponse,
    }),
    token(),
  ]),
]);

export function setNewPassword({ getUser, getPassword }) {
  return async (req, res, next) => {
    let user = getUser(req);
    let password = getPassword(req);

    user = await User.findOne({ _id: user.id });
    if (!user) throw new AppHttpError(401, 'Unauthorized');

    user.password = password;
    user.save();

    req.user = user;
    next();
  };
}

export function verifyUser({ getUser }) {
  return async (req, res, next) => {
    let user = getUser(req);

    user = await User.findOne({ _id: user.id });
    if (user.verified) throw new AppHttpError(401, 'Unauthorized');

    user.verified = true;
    user.save();

    req.user = user;
    next();
  };
}

export function validateToken({ headerKey, grant }) {
  return async (req, res, next) => {
    const authorization = get(req, 'headers.authorization');
    if (!authorization) next(new AppHttpError(401, 'Unauthorized'));

    var parts = authorization.split(' ');
    if (!(parts.length === 2 && parts[0] === headerKey))
      next(new AppHttpError(401, 'Unauthorized'));

    jwt.verify(parts[1], process.env.SECRET_TOKEN, async (err, decoded) => {
      if (err) next(new AppHttpError(401, 'Unauthorized'));

      if (get(decoded, 'grant') !== grant)
        next(new AppHttpError(401, 'Unauthorized'));

      req.token = parts[1];
      req.user = await User.findOne({ _id: decoded.id });

      if (!req.user) next(new AppHttpError(401, 'Unauthorized'));

      next();
    });
  };
}

export function token() {
  return async (req, res, next) => {
    const { user } = req;

    const accessToken = user.getAccessToken();
    const refreshToken = user.getRefreshToken();

    res.setHeader('access_token', accessToken);
    res.setHeader('refresh_token', refreshToken);

    next();
  };
}

export function authenticateUser(getAttributes) {
  return async (req, res, next) => {
    const { email, password } = pick(getAttributes(req), ['email', 'password']);

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppHttpError(400, 'NOT_EXIST');
    }

    if (!user.comparePassword(password))
      throw new AppHttpError(400, 'PASSWORD');

    req.user = user;
    next();
  };
}

export function findUser(getAttributes) {
  return async (req, res, next) => {
    const { email } = pick(getAttributes(req), ['email']);

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppHttpError(400, 'NOT_EXIST');
    }

    req.user = user;
    next();
  };
}

export function createUser(getAttributes) {
  return async (req, res, next) => {
    const { name, email, password, verified } = pick(getAttributes(req), [
      'name',
      'email',
      'password',
      'verified',
    ]);

    let user = await User.findOne({ email });
    if (user) {
      throw new AppHttpError(409, 'EMAIL_EXIST');
    }

    req.user = await new User({ name, email, password, verified }).save();

    next();
  };
}

export function updateUserFromSocial({ getUser, getSocialResponse }) {
  return async (req, res, next) => {
    const user = getUser(req);
    const socialResponse = getSocialResponse(req);
    const { code } = req.query;

    user.picture =
      user.picture || get(socialResponse, 'profile.photos[0].value');

    const provider = user[get(socialResponse, 'provider')];

    provider.id = get(socialResponse, 'profile.id');
    provider._raw = get(socialResponse, 'profile._raw');
    provider.token = get(socialResponse, 'accessToken');
    provider.refreshToken = get(socialResponse, 'refreshToken');
    provider.code = code;
    user.verified = true;

    user.save();
    next();
  };
}

export function sendWelcomeEmail({ getUser }) {
  return (req, res, next) => {
    const user = getUser(req);
    const { password } = req.body;

    sendWelcome({ emailTo: user.email, password, fullname: user.name });

    next();
  };
}

export function sendEmailVerifyAccount({ getUser }) {
  return (req, res, next) => {
    const user = getUser(req);
    if (!user.verified) {
      const token = user.getVerifyToken();

      sendVerify({ emailTo: user.email, token });

      res.setHeader('verify_token', token);
    }
    next();
  };
}

export function sendEmailVerification({ getUser }) {
  return (req, res, next) => {
    const user = getUser(req);
    if (user.verified) {
      sendVerification({ emailTo: user.email, fullname: user.name });
    }
    next();
  };
}

export function sendResetPasswordEmail({ getUser }) {
  return (req, res, next) => {
    const user = getUser(req);

    const token = user.getResetPasswordToken();

    sendResetPassword({ emailTo: user.email, token });

    res.setHeader('reset_password_token', token);

    next();
  };
}

export function sendPasswordChangedEmail({ getUser, getPassword }) {
  return (req, res, next) => {
    const user = getUser(req);
    const password = getPassword(req);

    sendPasswordChanged({ emailTo: user.email, password, fullname: user.name });

    next();
  };
}

export function disconnectFrom({ getUser, getVendor }) {
  return async (req, res, next) => {
    let user = getUser(req);
    let vendor = getVendor(req);

    user = await User.findOne({ _id: user.id });

    user[vendor] = null;
    user.save();

    req.user = user;
    next();
  };
}

export function setUserPassword({ getUser, getOldPassword, getPassword }) {
  return async (req, res, next) => {
    let user = getUser(req);
    let oldPassword = getOldPassword(req);
    let password = getPassword(req);

    user = await User.findOne({ _id: user.id });

    if (!user.comparePassword(oldPassword))
      throw new AppHttpError(400, 'PASSWORD');

    user.password = password;
    user.save();

    req.user = user;
    next();
  };
}
