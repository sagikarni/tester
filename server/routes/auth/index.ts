import { Router } from 'express';

import { authenticate } from 'passport';

const router = Router();
// router.get(/(facebook|twitter)/, ...);
// router.get(/(facebook|twitter)\/callback/, ...);

router.get('/facebook', (req, res, next) => {
  console.log('in facebook rule');

  authenticate('facebook', {
    scope: ['email']
  })(req, res);

  //  res.json({ api: true });
});

import * as httpMocks from 'node-mocks-http';
import { routes } from '../../../server/routes';
import { EventEmitter } from 'events';

router.get('/fuck', (req, res, next) => {

  
  const response = httpMocks.createResponse({
    eventEmitter: EventEmitter
  });

  let request = {};

  // if (user) {
  //   request = {
  //     url: '/api/v1/token/login',
  //     method: 'POST',
  //     body: {
  //       email: user.email,
  //       password: user.password,
  //     },
  //     headers: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //       'transfer-encoding': 'chunked'
  //     },
  //     query: {}
  //   };
  // } else {
    request = {
      url: '/api/v1/users',
      method: 'POST',
      body: { name: 'shlomi levi', email: 'wizardnet972@gmail.com', password: 'zdutv972', verified: true },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'transfer-encoding': 'chunked'
      },
      query: {}
    };
  // }

  response.on('end', async(breq, bres, bnext) => {
    const payload = JSON.parse(response._getData());
debugger;
    const token = bres.getHeaders('access_token');

    next(null, {
      token,
      payload
    });
  });

  (<any>routes).handle(request, response);

});

router.get('/facebook/callback', (req, res, next) => {
  console.log('in callback');

  authenticate('facebook', (err, { token, payload }) => {
    // // console.log('err', err);
    // // console.log('data', data);

    // var data = {
    //   user: {
    //     email: 'wizardnet972@gmail.com',
    //     name: 'Shlomi Levi',
    //     verified: true
    //   }
    // };

    // sendTo((<any>req).session.currentSocket, { type: 'token', payload: data });
    // res.json({ data });
    // res.setHeader('access_token', 'access_token_bla');
    // res.setHeader('refresh_token', 'refreshToken');

    res.writeHeader(200, { 'Content-Type': 'text/html' });

    var message = {
      message: 'facebookLogin',
      payload,
      access_token: token //res.get('access_token')
    };

    console.log('mmmm', message);

    res.write(`
    <script> 
       window.opener.postMessage(${JSON.stringify(message)}, "*"); 
       window.close();
    </script>`);

    res.end();

    // res.end(html);
  })(req, res, next);
});

export { router as auth };
