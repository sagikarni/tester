import './dotenv';

import chalk from 'chalk';
import { logger } from 'express-zone';

process.on('uncaughtException', (error: any) => {
  try {
    const { correlationId } = logger.log(
      'error',
      '[Uncaught Exception] %s',
      error
    );

    console.error({ error });
    console.error(chalk.red(`[${correlationId}]: ${error.message}`));

    if (!error.isOperational) {
      process.nextTick(() => process.exit());
    }
  } catch (e) {
    console.log({ uncaughtException: error });
    console.log({ catchOnUncaughtException: e });
    console.error(chalk.red(`FATAL ERROR! EXIT WITH 1`));
    process.nextTick(() => process.exit(1));
  }
});
