import * as jwt from 'jsonwebtoken';

const {
  ACCESS_TOKEN_SECRET: accessTokenSecrect,
  ACCESS_TOKEN_EXPIRES_IN: expiresIn,
} = process.env;

export const generateToken = async (payload) => {
  return jwt.sign(payload, accessTokenSecrect, {
    expiresIn,
  });
};
