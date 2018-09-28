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

router.get('/twitter', (req, res, next) => {
  authenticate('twitter')(req, res, next);
});

router.get('/twitter/callback', (req, res, next) => {
  authenticate('twitter', (err, { token, payload }) => {
    res.writeHeader(200, { 'Content-Type': 'text/html' });

    var message = {
      message: 'twitterLogin',
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

router.get('/linkedin', (req, res, next) => {
  authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] })(
    req,
    res,
    next
  );
});

router.get('/linkedin/callback', (req, res, next) => {
  authenticate('linkedin', (err, { token, payload }) => {
    res.writeHeader(200, { 'Content-Type': 'text/html' });

    var message = {
      message: 'linkedinLogin',
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

router.get('/google', (req, res, next) => {
  authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  authenticate('google', (err, { token, payload }) => {
    res.writeHeader(200, { 'Content-Type': 'text/html' });

    var message = {
      message: 'googleLogin',
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
