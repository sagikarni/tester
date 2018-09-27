import { Router } from 'express';
import { v1 } from './v1';
import { sendVerify } from '@libs/auth';

const router = Router();

router.all('/', (req, res, next) => {
  console.log('in api route');
  sendVerify({ emailTo: 'wizardent972@gmail.com', token: 'bla bla' });
  res.sendStatus(200);
});

router.use('/v1', v1);

export { router as api };
