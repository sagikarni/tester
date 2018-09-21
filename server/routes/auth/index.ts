import { Router } from 'express';

import { authenticate } from 'passport';

const router = Router();
// router.get(/(facebook|twitter)/, ...);
// router.get(/(facebook|twitter)\/callback/, ...);

router.get('/facebook', (req, res, next) => {

  console.log('in facebook rule');
  
  authenticate('facebook', {
    scope: ['email']
  })(req, res);

  //  res.json({ api: true });
});

router.get('/facebook/callback', (req, res, next) => {

  console.log('in callback');

  authenticate('facebook', (err, data) => {

    console.log('err', err);
    console.log('data', data);
      // sendTo((<any>req).session.currentSocket, { type: 'token', payload: data });
      res.json({ data });
      // res.end('<script>window.close()</script>');
  })(req, res, next);

});

export { router as auth };
