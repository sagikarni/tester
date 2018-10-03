import * as randomstring from 'randomstring';
import { get } from 'lodash';
import { Strategy } from '@passport-next/passport-facebook';
import { User } from '../database';
import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
// import { routes } from '../../../server/routes';

const credentials = {
  clientID: process.env.AUTH_FACEBOOK_CLIENT_ID,
  clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.AUTH_FACEBOOK_CALLBACK_URL,
  graphApiVersion: 'v3.1',
  profileFields: ['email', 'displayName', 'picture'],
  passReqToCallback: true
};

const strategy = async (
  req,
  facebookToken,
  facebookRefreshToken,
  profile,
  next
) => {
  const email = get(profile, 'emails[0].value');
  const name = get(profile, 'displayName');
  const password = randomstring.generate(8);

  const id = get(profile, 'id');
  const picture = get(profile, 'photos[0].value');
  const _raw = get(profile, '_raw');

  let user = await User.findOne({ email });

  const response = httpMocks.createResponse({ eventEmitter: EventEmitter });

  let request = {};

  if (user) {
    request = {
      url: '/api/v1/users/login',
      method: 'POST',
      body: {
        email: user.email,
        password: user.password
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'transfer-encoding': 'chunked'
      },
      query: {}
    };
  } else {
    request = {
      url: '/api/v1/users',
      method: 'POST',
      body: { name, email, password, verified: true },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'transfer-encoding': 'chunked'
      },
      query: {}
    };
  }

  response.on('end', async () => {
    const accessToken = response.get('access_token');
    const refreshToken = response.get('refresh_token');

    user = await User.findOne({ email });

    user.picture = user.picture || picture;
    user.verified = true;
    user.facebook.id = id;
    user.facebook.token = facebookToken;
    user.facebook.refreshToken = facebookRefreshToken;
    user.facebook._raw = _raw;

    user.save();

    const payload = user;

    next(null, { accessToken, refreshToken, payload });
  });

  // (<any>routes).handle(request, response);
};

export const facebookStrategy = new Strategy(credentials, strategy);
