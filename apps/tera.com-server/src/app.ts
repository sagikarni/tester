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
import { morganStreamWriter, AppHttpError } from 'express-zone';

import 'cognishine/src/mongodb';

import { clientErrorHandler, errorHandler } from 'express-zone';
import { routes } from './routes';

import { proxy } from 'aws3-proxy';
const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET } = process.env;

import passport from 'passport';
import { Strategy } from 'passport-facebook';

import { facebookStrategy, twitterStrategy } from './strategies';

passport.use(facebookStrategy);
passport.use(twitterStrategy);

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
    formatError: (err) => {
      if (err.originalError && err.originalError instanceof AppHttpError) {
        return {
          statusCode: err.originalError.httpCode,
          message: err.originalError.message,
        };
      }

      return { message: err.message, statusCode: err.status };
    },
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
