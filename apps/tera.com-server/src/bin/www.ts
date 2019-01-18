import './entrypoint';

import { db } from 'auth-node';
import { logger } from 'express-zone';
import http from 'http';

import app from '../app';

const PORT = process.env.SERVER_PORT || 3000;

async function createServer() {
  db.connection.once('open', async () => {
    logger.log('Connection database has been established successfully.');

    // await db.connection.db.dropDatabase();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.log(`app listening on port ${PORT}!`);
    });
  });

  await db.connect();
}

createServer();
