import { Router } from 'express';

import { authenticate } from 'passport';

const router = Router();
// router.get(/(facebook|twitter)/, ...);
// router.get(/(facebook|twitter)\/callback/, ...);

router.get('/facebook', (req, res, next) => {
  authenticate('facebook', {
    scope: ['email']
  })(req, res);
});

router.get('/facebook/callback', (req, res, next) => {
  authenticate('facebook', (err, { token, payload }) => {
    res.writeHeader(200, { 'Content-Type': 'text/html' });

    var message = {
      message: 'facebookLogin',
      payload,
      access_token: token
    };

    res.write(`
    <script>
       window.opener.postMessage(${JSON.stringify(message)}, "*"); 
       window.close();
    </script>`);

    res.end();
  })(req, res, next);
});

export { router as auth };
