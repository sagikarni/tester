import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
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

const app = express();

const morganFormat =
  process.env.NODE_ENV === 'production'
    ? ':remote-addr - :method :url [:status], resp. :response-time ms, :res[content-length] bytes, referrer ":referrer"'
    : 'dev';

// app.use(morgan(morganFormat, { stream: morganStreamWriter }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cookieParser());
app.use(compression());
app.use(methodOverride());
app.use(helmet());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.use(routes);

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
