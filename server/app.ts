import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as methodOverride from 'method-override';
import * as compress from 'compression';
import * as path from 'path';

import { routes } from './routes';
import { clientErrorHandler, errorHandler } from '@server/core';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

app.use(helmet());

app.use(routes);

app.use(express.static(path.resolve(__dirname, './public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.use(clientErrorHandler);
app.use(errorHandler);

export default app;


