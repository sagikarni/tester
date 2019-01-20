import { Router } from 'express';
import passport from 'passport';
import IfElseMiddleware from 'express-conditional-middleware';
import * as randomstring from 'randomstring';
import { get } from 'lodash';

import { registerWithSocial, loginWithSocial, User } from 'auth-node';

const providers = {
  facebook: { session: false, scope: ['email'], authType: 'rerequest' },
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
  '/:social/callback',
  (req, res, next) =>
    passport.authenticate(req.params.social, async (err, strategyResponse) => {
      console.log('in authenticate');

      console.log({ err, strategyResponse });

      console.log('hhhhh');

      if (!strategyResponse) {
        console.log('hhhhh3');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`<script>window.close();</script>`);
      }

      console.log('hhhhh2');

      if (err) {
        console.log('hhhhh5');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(
          `<script>window.opener.postMessage('ERROR', "*");window.close();</script>`
        );
      }

      console.log('after err');
      const email = get(strategyResponse, 'profile.emails[0].value');
      const name = get(strategyResponse, 'profile.displayName');
      const password = randomstring.generate(8);

      console.log({ email, name, password });

      if (!email) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(
          `<script>window.opener.postMessage('EMAIL_MISSING', "*");window.close();</script>`
        );
      }

      const user = await User.findOne({ email });

      req.userExist = !!user;
      req.strategyResponse = strategyResponse;
      req.body = req.userExist
        ? { password: user.password, email: user.email }
        : { email, name, password };

      console.log('next!');
      next();
    })(req, res, next),
  IfElseMiddleware(
    (req, res, next) => !req.userExist,
    registerWithSocial,
    loginWithSocial
  ),
  (req, res, next) => {
    console.log('after all');

    const { user } = req;

    const message = {
      accessToken: res.getHeader('access_token'),
      refreshToken: res.getHeader('refresh_token'),
      payload: user.toJSON(),
      message: `${req.strategyResponse.provider}Login`,
    };

    console.log({ message });
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
