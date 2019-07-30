import cors from 'cors';
import { Router } from 'express';
import { api } from './api';
import { auth } from './auth';
import AES from 'crypto-js/aes';

import * as jwt from 'jsonwebtoken';
import { AppHttpError } from 'express-zone';
import { Purchase } from 'cognishine/src/mongodb/purchases';
import { User } from 'cognishine/src/mongodb/user';
import { Plan } from 'cognishine/src/mongodb/plan';
import { generateToken } from 'cognishine/src/graphql/schema/token';
const TestTemplate = require('html-loader!./sec.html');

// import paypal from 'paypal-rest-sdk';

const router = Router();

router.use('/api', cors(), api);
router.use('/access', auth);

const routerx = Router();

const {
  ACCESS_TOKEN_SECRET: accessTokenSecrect,
  ACCESS_TOKEN_EXPIRES_IN: expiresIn,
} = process.env;

routerx.all('/:some', async (req, res, next) => {
  const { t } = req.body;
  debugger;

  const decoded = jwt.verify(t, accessTokenSecrect);
  if (!decoded) {
    throw new AppHttpError(401);
  }
  if (decoded.grant !== 'purchase') {
    throw new AppHttpError(401);
  }

  let user = await User.findById(decoded._id).populate('role');

  let userPurchase = await Purchase.findOne({ user });
  if (!userPurchase) {
    throw new AppHttpError(401);
  }

  let purchasePlan = userPurchase.purchases.find(
    (p) => p._id.toString() === decoded.purchasePlan && p.status === 'NEW'
  );
  debugger;
  purchasePlan.status = 'ACTIVE';
  purchasePlan._raw = JSON.stringify({
    body: req.body,
    params: req.params,
    headers: req.headers,
  });

  const planId = purchasePlan.plan.toString();
  const plan = await Plan.findById(planId);
  debugger;

  user.role = plan.role;
  user.save();
  debugger;

  await userPurchase.save();

  const token = await generateToken({
    _id: user._id,
    hsh: user.password,
    grant: 'access',
  });

  const secretkey = 'secretkey';

  const tokenEncrypt = AES.encrypt(token, secretkey);
  const userEncrypt = AES.encrypt(JSON.stringify(user), secretkey);

  let html = TestTemplate.replace('__T__', tokenEncrypt.toString());
  html = html.replace('__U__', userEncrypt.toString());
  html = html.replace('__S__', secretkey);

  res.send(html);
});

router.use('/pay', routerx);

export { router as routes };
