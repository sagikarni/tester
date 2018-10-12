import { Router } from 'express';
import expressConditionalMiddleware from 'express-conditional-middleware';
import { v1 } from './v1';

import { AppHttpError, async, asyncAll } from '@libs/express-zone';

const router = Router();

const test = asyncAll([middlewareA({}), middlewareB({}), middlewareC({})]);
// export const asyncAll = fns => fns.map(fn => async(fn));

export function middlewareA(options) {
  return (req, res, next) => {
    console.log('in a');
    next();
  };
}

export function middlewareB(options) {
  return (req, res, next) => {
    console.log('in b');
    // next();

    throw new Error('sometime');

    next();
  };
}

export function middlewareC(options) {
  return (req, res, next) => {
    console.log('in c');
    next();
  };
}

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

router.all(
  '/',
  expressConditionalMiddleware(
    (req, res, next) => {
      return true; // req.get('accept') === 'application/json';
    },
    combineMiddleware([
      ...test,
      // middlewareA({}),
      // middlewareB({}),
      // middlewareC({}),
    ]),

    //    test,
    // (req, res, next) => {
    //   // Executed if 'accept' === 'application/json'
    //   console.log('in 1');
    //   next();
    // },
    (req, res, next) => {
      console.log('in 2');
      // Executed if 'accept' !== 'application/json'
    },
  ),
  (req, res, next) => {
    console.log('in api route');

    //  next();
    // middlewareA({})(req, res, next);

    // return test;
    // test.forEach(t => t(req, res, next));

    // res.sendStatus(200);
  },
);

router.use('/v1', v1);

export { router as api };
