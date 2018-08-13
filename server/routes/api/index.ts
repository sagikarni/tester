import { Router } from 'express';
import { v1 } from './v1';

const router = Router();

router.all('/', (req, res, next) => {
    console.log('in api route');
    res.sendStatus(200);
});

router.use('/v1', v1);

export { router as api };