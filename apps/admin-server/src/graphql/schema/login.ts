import { AppHttpError } from 'express-zone';
import * as jwt from 'jsonwebtoken';
import { User } from '../../mongodb';

const {
  ACCESS_TOKEN_SECRET: accessTokenSecrect,
  ACCESS_TOKEN_EXPIRES_IN: expiresIn,
} = process.env;

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).populate('role');
  if (!user) {
    throw new AppHttpError(400, 'NOT_EXIST');
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    throw new AppHttpError(400, 'INVALID_PASSWORD');
  }

  const token = jwt.sign(
    {
      _id: user._id,
      hsh: user.password,
    },
    accessTokenSecrect,
    {
      expiresIn,
    }
  );
  return { token, user };
};
