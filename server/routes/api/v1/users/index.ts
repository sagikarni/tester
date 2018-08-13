import { Router } from 'express';

// import { register, login, sendWelcomeEmail, sendVerifyEmail, buildLoginRequest } from '@modules/auth';

const router = Router();

// router.post('/',
//     register,
//     sendWelcomeEmail({ getUser: req => req.user }),
//     sendVerifyEmail({ getUser: req => req.user }),
//     buildLoginRequest({
//         getUsername: req => req.body.email,
//         getPassword: req => req.body.password
//     }),
//     login);

// router.post('/verify',
//     decryptToken({
//         grant: 'verify',
//         getAuthorization: req => req.headers.authorization
//     }),
//     verify({ getUserId: req => req.token.payload.id }),
//     sendVerificationEmail({ getUser: req => req.user }),
//     buildLoginRequest({
//         getUsername: req => req.user.email,
//         getPassword: req => req.user.password
//     }),
//     login);

// router.post('/resend-verify',
//     authenticate,
//     sendVerifyEmail({ getUser: req => req.token.user }),
//     (req, res, next) => {
//         res.status(200).json({});
//     });

// router.post('/password',
//     decryptToken({
//         grant: 'password',
//         getAuthorization: req => req.headers.authorization
//     }),
//     changePassword({
//         getNewPassword: req => req.body.newPassword,
//         getUserId: req => req.token.payload.id
//     }),
//     sendPasswordChangedEmail({
//         getNewPassword: req => req.body.newPassword,
//         getUser: req => req.user
//     }),
//     buildLoginRequest({
//         getUsername: req => req.user.email,
//         getPassword: req => req.user.password
//     }),
//     login);


// router.post('/reset-password',
//     findUser({ getEmail: req => req.body.email }),
//     sendResetPasswordEmail({ getUser: req => req.user }),
//     (req, res, next) => {
//         res.status(200).json({});
//     });


// router.get('/profile',
//     authenticate,
//     (req, res, next) => {
//         res.json({
//             profile: (<any>req).token.user
//         });
//     });


// router.get('/me',
//     authenticate,
//     (req, res, next) => {
//         res.json({
//             profile: (<any>req).token.user
//         });
//     });

export { router as users };
