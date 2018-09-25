import { setApiKey, send } from '@sendgrid/mail';
import { resolve } from 'path';
import { load, compile, app, emailDefaultSender } from './template';

const emailContactMail = process.env.EMAIL_CONTACT_MAIL;
const urlVerifyAccount = process.env.URL_VERIFY_ACCOUNT;
const urlResetPassword = process.env.URL_RESET_PASSWORD;

setApiKey(process.env.EMAIL_SENDGRID_KEY);

load(resolve(__dirname, process.env.EMAIL_TEMPLATES_PATH));

export function sendWelcome({ emailTo, fullname, password }) {
  const msg = {
    to: emailTo,
    from: emailDefaultSender,
    subject: `Welcome to ${app}`,
    ...compile({
      templateName: 'welcome',
      context: {
        email: emailTo,
        app,
        fullname,
        password
      }
    })
  };

  console.log('sendWelcome: ', msg);
  send(msg);
}

export function sendVerify({ emailTo, token }) {
  const msg = {
    to: emailTo,
    from: emailDefaultSender,
    subject: `Confirm your ${app} account`,
    ...compile({
      templateName: 'confirm-your-account',
      context: {
        email: emailTo,
        app,
        emailContact: emailContactMail,
        tokenUrl: urlVerifyAccount + token
      }
    })
  };

  console.log('sendVerify: ', msg);
  send(msg);
}
