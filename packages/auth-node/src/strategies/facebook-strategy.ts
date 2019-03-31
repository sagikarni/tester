import { Strategy } from 'passport-facebook';
import { UserStrategy } from './user-strategy';
import { get } from 'lodash';

const credentials = {
  clientID: process.env.AUTH_FACEBOOK_CLIENT_ID,
  clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.AUTH_FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'emails', 'photos'],
};

const strategy = (accessToken, refreshToken, strategyProfile, done) => {
  console.log('in strategy!!');
  console.log({ accessToken, refreshToken, strategyProfile });

  const userStrategy: UserStrategy = {
    email: get(strategyProfile, 'emails[0].value'),
    name: get(strategyProfile, 'displayName'),
    picture: get(strategyProfile, 'photos[0].value'),
    _raw: strategyProfile,
  };

  done(null, { provider: 'facebook', accessToken, refreshToken, userStrategy });
};

export const facebookStrategy = new Strategy(credentials, strategy);
