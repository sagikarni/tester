import { setApiKey, send } from '@sendgrid/mail';
import { resolve } from 'path';
import { load, compile, app, emailDefaultSender } from './template';

const emailContactMail = process.env.EMAIL_CONTACT_MAIL;
const urlConfirmAccount = process.env.URL_CONFIRM_ACCOUNT;
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
  const tokenUrl = urlConfirmAccount + token;

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
        tokenUrl
      }
    })
  };

  console.log('sendVerify: ', msg);
  send(msg);
}

export function sendVerification({ emailTo, fullname }) {
  const msg = {
    to: emailTo,
    from: emailDefaultSender,
    subject: `Your email address has been successfully verified`,
    ...compile({
      templateName: 'verification',
      context: {
        email: emailTo,
        app,
        fullname
      }
    })
  };

  console.log('sendVerification: ', msg);
  send(msg);
}

export function sendResetPassword({ emailTo, token }) {
  const tokenUrl = urlConfirmAccount + token;

  const msg = {
    to: emailTo,
    from: emailDefaultSender,
    subject: `You told us you forgot your password`,
    ...compile({
      templateName: 'reset-password',
      context: {
        email: emailTo,
        app,
        tokenUrl
      }
    })
  };

  console.log('sendResetPassword: ', msg);
  send(msg);
}
