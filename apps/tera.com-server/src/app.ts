import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import helmet from 'helmet';
import methodOverride from 'method-override';
import path from 'path';

import { clientErrorHandler, errorHandler } from 'express-zone';
import { routes } from './routes';
import { facebookStrategy, googleStrategy, linkedinStrategy, twitterStrategy } from 'auth-node';

import passport from 'passport';

passport.use(facebookStrategy);
passport.use(twitterStrategy);
passport.use(linkedinStrategy);
passport.use(googleStrategy);

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

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './assets')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
