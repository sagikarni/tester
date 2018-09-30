import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import compress from 'compression';
import * as path from 'path';
import sessionExpress from 'express-session';

import { routes } from './routes';
import { clientErrorHandler, errorHandler } from '@libs/express-zone';

import { use, initialize, session } from 'passport';
import {
  facebookStrategy,
  twitterStrategy,
  linkedinStrategy,
  googleStrategy
} from '@libs/auth';

use(facebookStrategy);
use(twitterStrategy);
use(linkedinStrategy);
use(googleStrategy);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

app.use(helmet());

app.use(sessionExpress({ secret: 'SECRET' }));
app.use(initialize());
app.use(session());

app.use(routes);

app.use(express.static(path.resolve(__dirname, './public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
