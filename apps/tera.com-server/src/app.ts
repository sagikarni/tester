import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import helmet from 'helmet';
import methodOverride from 'method-override';
import path from 'path';
import graphqlHTTP from 'express-graphql';
import schema from 'cognishine/src/graphql/schema';
import morgan from 'morgan';
import { morganStreamWriter } from 'express-zone';

import 'cognishine/src/mongodb';

import { clientErrorHandler, errorHandler } from 'express-zone';
import { routes } from './routes';

import { proxy } from 'aws3-proxy';
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET } = process.env;

import passport from 'passport';
import { Strategy } from 'passport-facebook';

import { facebookStrategy, twitterStrategy } from './strategies';

// import { get } from 'lodash';

// const credentials = {
//   clientID: process.env.AUTH_FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET,
//   callbackURL: process.env.AUTH_FACEBOOK_CALLBACK_URL,
//   profileFields: ['id', 'displayName', 'emails', 'photos'],
// };

// const strategy = (accessToken, refreshToken, strategyProfile, done) => {
//   console.log('in strategy!!');
//   console.log({ accessToken, refreshToken, strategyProfile });

//   const userStrategy = {
//     email: get(strategyProfile, 'emails[0].value'),
//     name: get(strategyProfile, 'displayName'),
//     picture: get(strategyProfile, 'photos[0].value'),
//     _raw: strategyProfile,
//   };

//   done(null, { provider: 'facebook', accessToken, refreshToken, userStrategy });
// };

// const facebookStrategy = new Strategy(credentials, strategy);

// import {
//    facebookStrategy,
// //   googleStrategy,
// //   linkedinStrategy,
// //   twitterStrategy,
//  } from 'auth-node';

passport.use(facebookStrategy);
passport.use(twitterStrategy);
// passport.use(linkedinStrategy);
// passport.use(googleStrategy);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(methodOverride());
app.use(helmet());

app.use(expressSession({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './assets')));

app.get(
  '/storage/*',
  proxy({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    bucket: BUCKET,
  })
);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
