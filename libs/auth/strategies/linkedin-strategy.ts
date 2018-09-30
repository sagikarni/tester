import * as randomstring from 'randomstring';
import { get } from 'lodash';
import { Strategy } from 'passport-linkedin';
import { User } from '../database';
import * as httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import { routes } from '../../../server/routes';

const credentials = {
  consumerKey: process.env.AUTH_LINKEDIN_CLIENT_ID,
  consumerSecret: process.env.AUTH_LINKEDIN_CLIENT_SECRET,
  callbackURL: process.env.AUTH_LINKEDIN_CALLBACK_URL,
  includeEmail: true,
  passReqToCallback: true,
  profileFields: [
    'id',
    'first-name',
    'last-name',
    'email-address',
    'headline',
    'picture-url'
  ]
};

const strategy = async (
  req,
  linkedinToken,
  linkedinRefreshToken,
  profile,
  next
) => {
  const email = get(profile, 'emails[0].value');
  const name = get(profile, 'displayName');
  const password = randomstring.generate(8);

  const id = get(profile, 'id');
  const picture = get(profile, '_json.pictureUrl');
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
    user.linkedin.id = id;
    user.linkedin.token = linkedinToken;
    user.linkedin.refreshToken = linkedinRefreshToken;
    user.linkedin._raw = _raw;

    user.save();

    const payload = user;

    next(null, { accessToken, refreshToken, payload });
  });

  (<any>routes).handle(request, response);
};

export const linkedinStrategy = new Strategy(credentials, strategy);
