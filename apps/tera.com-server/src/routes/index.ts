import cors from 'cors';
import { Router } from 'express';
import { api } from './api';
import { auth } from './auth';
import paypal from 'paypal-rest-sdk';

const router = Router();

router.use('/api', cors(), api);
router.use('/access', auth);

const routerx = Router();

routerx.get('/', (req, res, next) => {
  console.log('in pay!!');

  const payments = paypal.v1.payments;

  let env;
  // if (process.env.NODE_ENV === 'production') {
  //   // Live Account details
  //   env = new paypal.core.LiveEnvironment('Your Live Client ID', 'Your Live Client Secret');
  // } else {
  env = new paypal.core.SandboxEnvironment(
    'AeZ74kItyHCZSnz9LVZBV_692LFmHRz6r37-eHDuYrRqVVX2Zfl-qWvj_U2EJUR-D0voSb97aM7Alv9P',
    'EJ777S3uuUWCHY0xSOv2DHpRorof3VClidLnQY7TOWJX5K0Age_x24h5qOWW4_yfxIkI9HRofMxNbpJw'
  );
  // }

  const packages = [
    {
      amount: {
        currency: 'USD',
        total: 10.0,
      },
      description: 'This is payment description.',
      item_list: {
        items: [
          {
            quantity: '1',
            name: 'ticket',
            price: 10.0,
            currency: 'USD',
          },
        ],
      },
    },
  ];

  const cpackage = packages[0];
  let client = new paypal.core.PayPalHttpClient(env);

  let payment = {
    intent: 'sale',
    transactions: [cpackage],
    redirect_urls: {
      cancel_url: 'http://localhost:3000/pay/cancel',
      return_url: 'http://localhost:3000/pay/return',
    },
    payer: {
      payment_method: 'paypal',
    },
  };

  let request = new payments.PaymentCreateRequest();
  request.requestBody(payment);

  client
    .execute(request)
    .then((response) => {
      console.log(response.statusCode);
      console.log(response.result);

      var id = response.result.id;
      var links = response.result.links;
      var counter = links.length;
      while (counter--) {
        if (links[counter].method === 'REDIRECT') {
          return res.redirect(links[counter].href);
        }
      }
    })
    .catch((error) => {
      console.error(error.statusCode);
      console.error(error.message);
    });

  // res.json({ work: true });
});

routerx.all('/:some', (req, res, next) => {
  debugger;
});

router.use('/pay', routerx);

export { router as routes };
