import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import methodOverride from 'method-override';
import path from 'path';
import graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import morgan from 'morgan';
import { morganStreamWriter } from 'express-zone';

import './mongodb';

import { clientErrorHandler, errorHandler } from 'express-zone';
import { routes } from './routes';

const app = express();

const morganFormat =
  process.env.NODE_ENV === 'production'
    ? ':remote-addr - :method :url [:status], resp. :response-time ms, :res[content-length] bytes, referrer ":referrer"'
    : 'dev';

// app.use(morgan(morganFormat, { stream: morganStreamWriter }));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(methodOverride());
app.use(helmet());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(routes);

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './assets')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.use(clientErrorHandler);
app.use(errorHandler);

export default app;
