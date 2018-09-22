// import * as jwt from 'jsonwebtoken';
// import * as bcrypt from 'bcrypt-nodejs';
import * as randomstring from 'randomstring';
import { get } from 'lodash';
import { Strategy } from '@passport-next/passport-facebook'; //'passport-facebook';
import { User } from '../database';
// // import { emailService } from '../utils/email.service';
// import * as flow from 'middleware-flow';
// import * as express from 'express';
// import * as request from 'request';
// import * as httpOutgoing from 'http-outgoing';

import * as httpMocks from 'node-mocks-http';

// // var series = require('middleware-flow').series;
import { EventEmitter } from 'events';

// import { Response } from '../oauth2';

// import app from '../app';

import { routes } from '../../../server/routes';

const credentials = {
  clientID: process.env.FACEBOOK_AUTH_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_AUTH_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_AUTH_CALLBACK_URL,
  graphApiVersion: 'v3.1',
  profileFields: ['email', 'displayName'],

  // profileFields: ['id', 'email'],

  // profileURL: process.env.FACEBOOK_AUTH_PROFILE_URL,
  passReqToCallback: true
};

const strategy = async (req, token, refreshToken, profile, next, n, v) => {
  console.log('in strategy');

  // process.nextTick(() => {

  console.log('token', token);
  console.log('refreshToken', refreshToken);
  console.log('profile', profile);

  const email = get(profile, 'emails[0].value');
  const name = get(profile, 'displayName');
  const password = randomstring.generate(8);

  let user = await User.findOne({ email });

  const response = httpMocks.createResponse({
    eventEmitter: EventEmitter
  });

  let request = {};

  if (user) {
    request = {
      url: '/api/v1/users/login',
      method: 'POST',
      body: {
        email: user.email,
        password: user.password,
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

  response.on('end', async(breq, bres, bnext) => {
    const payload = JSON.parse(response._getData());

    const token = response.get('access_token');

    next(null, {
      token,
      payload
    });
  });

  (<any>routes).handle(request, response);

};

export const facebookStrategy = new Strategy(credentials, strategy);
