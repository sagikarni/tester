import './bootstrap';

import { logger } from 'express-zone';
import { connect, connection } from 'mongoose';
import http from 'http';

import app from '../app';

const { MONGODB_URI, SERVER_PORT } = process.env;

async function createServer() {
  connection.once('open', async () => {
    logger.log('Connection database has been established successfully.');

    // await db.connection.db.dropDatabase();

    const server = http.createServer(app);

    server.listen(SERVER_PORT || 3000, () => {
      logger.log(`app listening on port ${SERVER_PORT}!`);
    });
  });

  await connect(MONGODB_URI);
}

createServer();
