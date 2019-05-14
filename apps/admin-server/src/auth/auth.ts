import * as express from 'express';
// import * as passport from 'passport';
// import { IMongooseUser } from '../../models';
// import { forgeJwtTokenFor } from '../index';
// import { LOCAL_STRATEGY } from './local-strategy';

const router = express.Router();

// passport.use(LOCAL_STRATEGY);

router.post('/', (req, res, next) => {
  // passport.authenticate('local', (err: any, user: IMongooseUser, loginError: any) => {
  //     const error = err || loginError;
  //     if (error) {
  //         return res.status(401).json({ error: error.name, message: error.message });
  //     } else if (!user) {
  //         return res.status(500).json({ error: error.name, message: 'Something went wrong, please try again.' });
  //     }

  //     const token = forgeJwtTokenFor(user);

  //     res.json({ token });
  // })(req, res, next);
  debugger;
  const token = 'blabla';
  res.json({ token });
});

export default router;

// import { Strategy as LocalStrategy } from 'passport-local';
// import { IMongooseUser } from '../../models';
// import { getUserFromEmailAndPassword } from '../index';
// import { AuthenticationError } from '../auth-errors';

// export const LOCAL_STRATEGY = new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, async (email: string, password: string, done: DoneFunc) => {
//     try {
//         const user = await getUserFromEmailAndPassword(email, password);

//         return done(null, user);
//     } catch (err) {
//         return err instanceof AuthenticationError ? done(null, false) : done(err);
//     }
// });
