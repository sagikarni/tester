import { Router } from 'express';
import passport from 'passport';
import AES from 'crypto-js/aes';
import * as jwt from 'jsonwebtoken';
const {
  ACCESS_TOKEN_SECRET: accessTokenSecrect,
  ACCESS_TOKEN_EXPIRES_IN: expiresIn,
} = process.env;
const TestTemplate = require('html-loader!./sec.html');

import { User } from 'cognishine/src/mongodb';

// import IfElseMiddleware from 'express-conditional-middleware';
import * as randomstring from 'randomstring';
// import { get } from 'lodash';

// import { registerWithSocial, loginWithSocial, User } from 'auth-node';

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

router.get('/:social/return', (req, res, next) => {
  passport.authenticate(req.params.social, async (err, fromStrategy) => {
    console.log('in authenticate');
    const { userStrategy } = fromStrategy;
    const { email, name } = userStrategy;

    console.log({ fromStrategy });

    const vendor = {
      token: fromStrategy.accessToken,
      // refreshToken: { type: String },
      // code: { type: String },
      _raw: userStrategy._raw._raw,
    };

    let user = await User.findOne({ email });
    if (!user) {
      user = new User();
      user.name = name;
      user.password = randomstring.generate(8);
      user.email = email;
      user.picture = userStrategy.picture;
      user.verified = true;
      user[req.params.social] = vendor;
      user = await user.save();
    } else {
      user.picture = userStrategy.picture;
      user.verified = true;
      user[req.params.social] = vendor;
      user = await user.save();
    }

    console.log({ a: req.params.social });

    const token = jwt.sign(
      {
        _id: user._id,
        hsh: user.password,
      },
      accessTokenSecrect,
      {
        expiresIn,
      }
    );

    console.log({ t: token });

    const secretkey = 'secretkey';

    const tokenEncrypt = AES.encrypt(token, secretkey);
    const userEncrypt = AES.encrypt(JSON.stringify(user), secretkey);

    let html = TestTemplate.replace('__T__', tokenEncrypt.toString());
    html = html.replace('__U__', userEncrypt.toString());
    html = html.replace('__S__', secretkey);

    res.send(html);
  })(req, res, next);
});

// var x = {
//   fromStrategy: {
//     provider: 'facebook',
//     accessToken:
//       'EAAHNJMS6LZC8BANqP41LofIoVJUDHSuHeMcwzCVJZCHJA5D1AKqZCyBtWZBpAwzSXBCGrQy0mlZAm9nhvZBwtHLDUH9bKF27sLxl0cuxN7EQZAz0xhDVsCZAc8t3eyLZCixswM2aHM9kiokr8tu3JkjZBhp4zg4pxZCQxlkumUjL2flnOCp4nqVZCZAvBRW8cJSEa5tyOK43FR8rxmAZDZD',
//     userStrategy: {
//       email: 'wizardnet972@gmail.com',
//       name: 'Shlomi Levi',
//       picture:
//         'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10217572627016687&height=50&width=50&ext=1563366102&hash=AeQAid4Kzvb7sOWj',
//       _raw: {
//         id: '10217572627016687',
//         displayName: 'Shlomi Levi',
//         name: {},
//         emails: [{ value: 'wizardnet972@gmail.com' }],
//         photos: [
//           {
//             value:
//               'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10217572627016687&height=50&width=50&ext=1563366102&hash=AeQAid4Kzvb7sOWj',
//           },
//         ],
//         provider: 'facebook',
//         _raw:
//           '{"id":"10217572627016687","name":"Shlomi Levi","email":"wizardnet972\\u0040gmail.com","picture":{"data":{"height":50,"is_silhouette":false,"url":"https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=10217572627016687&height=50&width=50&ext=1563366102&hash=AeQAid4Kzvb7sOWj","width":50}}}',
//         _json: {
//           id: '10217572627016687',
//           name: 'Shlomi Levi',
//           email: 'wizardnet972@gmail.com',
//           picture: {
//             data: {
//               height: 50,
//               is_silhouette: false,
//               url:
//                 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10217572627016687&height=50&width=50&ext=1563366102&hash=AeQAid4Kzvb7sOWj',
//               width: 50,
//             },
//           },
//         },
//       },
//     },
//   },
// };

//   (req, res, next) =>
//     passport.authenticate(req.params.social, async (err, fromStrategy) => {

//     });

//       if (!fromStrategy) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         return res.end(`<script>window.close();</script>`);
//       }

//       if (err) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         return res.end(
//           `<script>window.opener.postMessage('ERROR', "*");window.close();</script>`
//         );
//       }

//       const { userStrategy } = fromStrategy;
//       const { email, name } = userStrategy;

//       if (!email) {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         return res.end(
//           `<script>window.opener.postMessage('EMAIL_MISSING', "*");window.close();</script>`
//         );
//       }

//       const user = await User.findOne({ email });

//       req.userExist = !!user;
//       req.fromStrategy = fromStrategy;
//       req.body = req.userExist
//         ? { password: user.password, email: user.email }
//         : { email, name, password: randomstring.generate(8) };

//       next();
//     })(req, res, next),
//   IfElseMiddleware(
//     (req, res, next) => !req.userExist,
//     registerWithSocial,
//     loginWithSocial
//   ),
//   (req, res, next) => {
//     const { user } = req;

//     const message = {
//       accessToken: res.getHeader('access_token'),
//       refreshToken: res.getHeader('refresh_token'),
//       payload: user.toJSON(),
//       message: `${req.fromStrategy.provider}Login`,
//     };

//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     return res.end(
//       `<script> window.opener.postMessage(${JSON.stringify(
//         message
//       )}, "*"); window.close();</script>`
//     );
//   }
// );

// // router.get('/twitter', (req, res, next) => {
// //   passport.authenticate('twitter')(req, res, next);
// // });

// // router.get('/twitter/return', (req, res, next) => {
// //   passport.authenticate('twitter', (err, strategyResponse) => {
// //     if (err) {
// //       throw err;
// //     }

// //     const { accessToken, refreshToken, payload } = strategyResponse;

// //     res.writeHead(200, { 'Content-Type': 'text/html' });

// //     const message = {
// //       accessToken,
// //       payload,
// //       refreshToken,
// //       message: 'twitterLogin',
// //     };

// //     res.write(`
// //     <script>
// //        window.opener.postMessage(${JSON.stringify(message)}, "*");
// //        window.close();
// //     </script>`);

// //     res.end();
// //   })(req, res, next);
// // });

// // router.get('/linkedin', (req, res, next) => {
// //   passport.authenticate('linkedin', {
// //     scope: ['r_basicprofile', 'r_emailaddress'],
// //   })(req, res, next);
// // });

// // router.get('/linkedin/return', (req, res, next) => {
// //   passport.authenticate('linkedin', (err, strategyResponse) => {
// //     if (err) {
// //       throw err;
// //     }

// //     const { accessToken, refreshToken, payload } = strategyResponse;

// //     res.writeHead(200, { 'Content-Type': 'text/html' });

// //     const message = {
// //       payload,
// //       accessToken,
// //       refreshToken,
// //       message: 'linkedinLogin',
// //     };

// //     res.write(`
// //     <script>
// //        window.opener.postMessage(${JSON.stringify(message)}, "*");
// //        window.close();
// //     </script>`);

// //     res.end();
// //   })(req, res, next);
// // });

// // router.get('/google', (req, res, next) => {
// //   passport.authenticate('google', { scope: ['profile', 'email'] })(
// //     req,
// //     res,
// //     next
// //   );
// // });

// // router.get('/google/return', (req, res, next) => {
// //   passport.authenticate('google', (err, strategyResponse) => {
// //     if (err) {
// //       throw err;
// //     }

// //     const { accessToken, refreshToken, payload } = strategyResponse;

// //     res.writeHead(200, { 'Content-Type': 'text/html' });

// //     const message = {
// //       payload,
// //       accessToken,
// //       refreshToken,
// //       message: 'googleLogin',
// //     };

// //     res.write(`
// //     <script>
// //        window.opener.postMessage(${JSON.stringify(message)}, "*");
// //        window.close();
// //     </script>`);

// //     res.end();
// //   })(req, res, next);
// // });

export { router as auth };
