import './bootstrap';

// import { db } from 'auth-node';
import { logger } from 'express-zone';
import http from 'http';
import { connect, connection } from 'mongoose';
// import { migrate } from '../migrations/01_create_base_users';

import app from '../app';

const PORT = process.env.SERVER_PORT || 3000;

async function createServer() {
  connection.once('open', async () => {
    logger.log('Connection database has been established successfully.');

    // await db.connection.db.dropDatabase();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      logger.log(`app listening on port ${PORT}!`);
    });

    // migrate();
  });

  await connect(process.env.MONGODB_URI);
}

createServer();
