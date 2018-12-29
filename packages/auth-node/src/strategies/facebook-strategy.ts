import { Strategy } from 'passport-facebook';

const credentials = {
  clientID: process.env.AUTH_FACEBOOK_CLIENT_ID,
  clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.AUTH_FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'emails', 'photos']
};

const strategy = (accessToken, refreshToken, profile, done) => {
  console.log('in strategy!!');
  console.log({ accessToken, refreshToken, profile });

  done(null, { provider: 'facebook', accessToken, refreshToken, profile });
};

export const facebookStrategy = new Strategy(credentials, strategy);
