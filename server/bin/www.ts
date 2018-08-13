import './polyfills';

import { createServer } from 'http';
import { connect, sequelize } from '@server/database';
import { logger } from '@server/core';

import app from '@server/app';

const PORT = process.env.PORT || 3000;

(async () => {
  await connect();

  console.log('Connection database has been established successfully.');

  // await sequelize.sync({ force: true });

  const server = createServer(app);

  server.listen(PORT, () => {
    logger.log(`server started on port ${PORT}`);
    console.info(`server started on port ${PORT}`);
  });
})();
