import { Router } from 'express';

import passport from 'passport';

import expressConditionalMiddleware from 'express-conditional-middleware';
import * as randomstring from 'randomstring';

import { authenticateUser, createUser, sendWelcomeEmail, token, updateUserFromSocial, User } from 'auth-node';

import { asyncAll } from 'express-zone';
import { get } from 'lodash';

const registerWithSocial = combineMiddleware([
  ...asyncAll([
    createUser(req => req.body),
    sendWelcomeEmail({ getUser: req => req.user }),
    updateUserFromSocial({
      getUser: req => req.user,
      getSocialResponse: req => req.social
    }),
    token()
  ])
]);

const loginWithSocial = combineMiddleware([
  ...asyncAll([
    authenticateUser(req => req.body),
    updateUserFromSocial({
      getUser: req => req.user,
      getSocialResponse: req => req.social
    }),
    token()
  ])
]);

const router = Router();

const options = {
  facebook: { session: false, scope: ['email'], authType: 'rerequest' }
};

router.get('/:social', (req, res, next) => {
  passport.authenticate(req.params.social, options[req.params.social])(req, res, next);
});

router.get(
  '/:social/callback',
  (req, res, next) =>
  passport.authenticate(req.params.social, async (err, strategyResponse) => {
      console.log('in here');

      console.log({ err, strategyResponse });

      (req as any).social = strategyResponse;

      const email = get(req, 'social.profile.emails[0].value');
      const name = get(req, 'social.profile.displayName');
      const password = randomstring.generate(8);

      if (!email) {
        res.end('SOCIAL_EMAIL_MISSING');
        return;
      }

      const user = await User.findOne({ email });

      req.body = user ? { password: user.password, email: user.email } : { email, name, password };

      (req as any).userExist = !!user;

      next();
    })(req, res, next),
  expressConditionalMiddleware((req, res, next) => !req.userExist, registerWithSocial, loginWithSocial),
  (req, res, next) => {
    console.log('after all');

    const { user } = req as any;

    res.json(user.toJSON());
  }
);

function combineMiddleware(mids) {
  return mids.reduce((a, b) => {
    return (req, res, next) => {
      a(req, res, (err: any) => {
        if (err) {
          return next(err);
        }
        b(req, res, next);
      });
    };
  });
}

router.get('/twitter', (req, res, next) => {
  passport.authenticate('twitter')(req, res, next);
});

router.get('/twitter/return', (req, res, next) => {
  passport.authenticate('twitter', (err, strategyResponse) => {
    if (err) {
      throw err;
    }

    const { accessToken, refreshToken, payload } = strategyResponse;

    res.writeHead(200, { 'Content-Type': 'text/html' });

    const message = {
      accessToken,
      payload,
      refreshToken,
      message: 'twitterLogin'
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
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] })(req, res, next);
});

router.get('/linkedin/return', (req, res, next) => {
  passport.authenticate('linkedin', (err, strategyResponse) => {
    if (err) {
      throw err;
    }

    const { accessToken, refreshToken, payload } = strategyResponse;

    res.writeHead(200, { 'Content-Type': 'text/html' });

    const message = {
      payload,
      accessToken,
      refreshToken,
      message: 'linkedinLogin'
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
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/return', (req, res, next) => {
  passport.authenticate('google', (err, strategyResponse) => {
    if (err) {
      throw err;
    }

    const { accessToken, refreshToken, payload } = strategyResponse;

    res.writeHead(200, { 'Content-Type': 'text/html' });

    const message = {
      payload,
      accessToken,
      refreshToken,
      message: 'googleLogin'
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

export function testA(getAttributes) {
  return async (req, res, next) => {
    console.log('in test a');
    next();
  };
}

export function testB(getAttributes) {
  return async (req, res, next) => {
    console.log('in test B');
    next();
  };
}
