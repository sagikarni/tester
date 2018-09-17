import { pick } from 'lodash';
import { User } from '../database';
import * as jwt from 'jsonwebtoken';
import { async, asyncAll, AppHttpError } from '@libs/express-zone';
import { get } from 'lodash';

export const register = asyncAll([
  createUser(req => req.body),
  sendWelcomeEmail({ getUser: req => req.user }),
  sendVerifyEmail({ getUser: req => req.user }),
  token()
]);

export const login = asyncAll([authenticateUser(req => req.body), token()]);

export const confirmEmail = asyncAll([
  validateToken({ headerKey: 'Basic', grant: 'confirm' }),
  validateUser({ getUser: req => req.user }),
  token()
]);

export const sendConfirm = asyncAll([
  validateToken({ headerKey: 'Bearer', grant: 'access' }),
  sendVerifyEmail({ getUser: req => req.user })
]);

export const authenticate = asyncAll([
  validateToken({ headerKey: 'Bearer', grant: 'access' }),
  token()
]);

export const refreshToken = asyncAll([
  validateToken({ headerKey: 'Bearer', grant: 'refresh' }),
  token()
]);

export const resetPassword = asyncAll([
  findUser(req => req.body),
  sendResetPasswordEmail({ getUser: req => req.user })
]);

export const newPassword = asyncAll([
  validateToken({ headerKey: 'Bearer', grant: 'reset' })
]);

export function validateUser({ getUser }) {
  return async (req, res, next) => {
    let user = getUser(req);

    user = await User.findOneAndUpdate({ _id: user.id }, { verified: true });

    req.user = user;
    next();
  };
}

export function validateToken({ headerKey, grant }) {
  return async (req, res, next) => {
    const authorization = get(req, 'headers.authorization');
    if (!authorization) throw new AppHttpError(401, 'Unauthorized');

    var parts = authorization.split(' ');
    if (!(parts.length === 2 && parts[0] === headerKey))
      throw new AppHttpError(401, 'Unauthorized');

    jwt.verify(parts[1], process.env.SECRET_TOKEN, async (err, decoded) => {
      if (err) next(new AppHttpError(401, 'Unauthorized'));

      if (get(decoded, 'grant') !== grant)
        throw new AppHttpError(401, 'Unauthorized');

      req.token = parts[1];
      req.user = await User.findOne({ _id: decoded.id });
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
    const { name, email, password } = pick(getAttributes(req), [
      'name',
      'email',
      'password'
    ]);

    let user = await User.findOne({ email });
    if (user) {
      throw new AppHttpError(409, 'EMAIL_EXIST');
    }

    req.user = await new User({ name, email, password }).save();

    next();
  };
}

export function sendWelcomeEmail({ getUser }) {
  return (req, res, next) => {
    const user = getUser(req);

    console.log(`sendWelcomeEmail to ${user.email}`);
    // sendWelcome({
    //     emailTo: attributes.email,
    //     fullname: attributes.name,
    //     password: attributes.password
    // });

    next();
  };
}

export function sendVerifyEmail({ getUser }) {
  return (req, res, next) => {
    const user = getUser(req);

    console.log(`send email to ${user.email} token: ${user.getConfirmToken()}`);
    // sendWelcome({
    //     emailTo: attributes.email,
    //     fullname: attributes.name,
    //     password: attributes.password
    // });
    res.setHeader('confirm_token', user.getConfirmToken());

    next();
  };
}

export function sendResetPasswordEmail({ getUser }) {
  return (req, res, next) => {
    const user = getUser(req);

    console.log(
      `send email to ${user.email} token: ${user.getResetPasswordToken()}`
    );

    //   sendResetPassword({
    //     emailTo: user.email,
    //     token: token
    // });

    res.setHeader('reset_password_token', user.getResetPasswordToken());

    next();
  };
}
