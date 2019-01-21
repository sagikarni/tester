import { Router } from 'express';
import passport from 'passport';
import IfElseMiddleware from 'express-conditional-middleware';
import * as randomstring from 'randomstring';
import { get } from 'lodash';

import { registerWithSocial, loginWithSocial, User } from 'auth-node';

const providers = {
  facebook: { session: false, scope: ['email'], authType: 'rerequest' },
  twitter: { session: false, scope: ['email'], authType: 'rerequest' },
};

const router = Router();

router.get('/:social', (req, res, next) =>
  passport.authenticate(req.params.social, providers[req.params.social])(
    req,
    res,
    next
  )
);

router.get(
  '/:social/return',
  (req, res, next) =>
    passport.authenticate(req.params.social, async (err, fromStrategy) => {
      if (!fromStrategy) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`<script>window.close();</script>`);
      }

      if (err) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(
          `<script>window.opener.postMessage('ERROR', "*");window.close();</script>`
        );
      }

      const { userStrategy } = fromStrategy;
      const { email, name } = userStrategy;

      if (!email) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(
          `<script>window.opener.postMessage('EMAIL_MISSING', "*");window.close();</script>`
        );
      }

      const user = await User.findOne({ email });

      req.userExist = !!user;
      req.fromStrategy = fromStrategy;
      req.body = req.userExist
        ? { password: user.password, email: user.email }
        : { email, name, password: randomstring.generate(8) };

      next();
    })(req, res, next),
  IfElseMiddleware(
    (req, res, next) => !req.userExist,
    registerWithSocial,
    loginWithSocial
  ),
  (req, res, next) => {
    const { user } = req;

    const message = {
      accessToken: res.getHeader('access_token'),
      refreshToken: res.getHeader('refresh_token'),
      payload: user.toJSON(),
      message: `${req.fromStrategy.provider}Login`,
    };

    res.writeHead(200, { 'Content-Type': 'text/html' });

    return res.end(
      `<script> window.opener.postMessage(${JSON.stringify(
        message
      )}, "*"); window.close();</script>`
    );
  }
);

// router.get('/twitter', (req, res, next) => {
//   passport.authenticate('twitter')(req, res, next);
// });

// router.get('/twitter/return', (req, res, next) => {
//   passport.authenticate('twitter', (err, strategyResponse) => {
//     if (err) {
//       throw err;
//     }

//     const { accessToken, refreshToken, payload } = strategyResponse;

//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     const message = {
//       accessToken,
//       payload,
//       refreshToken,
//       message: 'twitterLogin',
//     };

//     res.write(`
//     <script>
//        window.opener.postMessage(${JSON.stringify(message)}, "*");
//        window.close();
//     </script>`);

//     res.end();
//   })(req, res, next);
// });

// router.get('/linkedin', (req, res, next) => {
//   passport.authenticate('linkedin', {
//     scope: ['r_basicprofile', 'r_emailaddress'],
//   })(req, res, next);
// });

// router.get('/linkedin/return', (req, res, next) => {
//   passport.authenticate('linkedin', (err, strategyResponse) => {
//     if (err) {
//       throw err;
//     }

//     const { accessToken, refreshToken, payload } = strategyResponse;

//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     const message = {
//       payload,
//       accessToken,
//       refreshToken,
//       message: 'linkedinLogin',
//     };

//     res.write(`
//     <script>
//        window.opener.postMessage(${JSON.stringify(message)}, "*");
//        window.close();
//     </script>`);

//     res.end();
//   })(req, res, next);
// });

// router.get('/google', (req, res, next) => {
//   passport.authenticate('google', { scope: ['profile', 'email'] })(
//     req,
//     res,
//     next
//   );
// });

// router.get('/google/return', (req, res, next) => {
//   passport.authenticate('google', (err, strategyResponse) => {
//     if (err) {
//       throw err;
//     }

//     const { accessToken, refreshToken, payload } = strategyResponse;

//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     const message = {
//       payload,
//       accessToken,
//       refreshToken,
//       message: 'googleLogin',
//     };

//     res.write(`
//     <script>
//        window.opener.postMessage(${JSON.stringify(message)}, "*");
//        window.close();
//     </script>`);

//     res.end();
//   })(req, res, next);
// });

export { router as auth };
