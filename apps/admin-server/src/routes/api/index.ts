import { Router } from 'express';
import { errorFilename, combinedFilename } from 'express-zone';
import { promisify } from 'util';
import fs from 'fs';

const readFile = promisify(fs.readFile);
const router = Router();

router.all('/', (req, res) => {
  console.log('in /api');
  res.json({ ok: true });
});

router.all('/logs', async (req, res) => {
  const errorLogs = await readFile(errorFilename, 'utf-8');
  const combinedLogs = await readFile(combinedFilename, 'utf-8');

  console.log('in /logs');
  res.json({ errorLogs, combinedLogs });
});

export { router as api };
