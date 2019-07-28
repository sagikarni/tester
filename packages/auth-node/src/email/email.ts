import * as mail from '@sendgrid/mail';
import * as path from 'path';
import { load, compile, app, emailDefaultSender } from './template';

const emailContactMail = process.env.EMAIL_CONTACT_MAIL;
const urlVerifyAccount = process.env.URL_VERIFY_ACCOUNT;
const urlChangePassword = process.env.URL_CHANGE_PASSWORD;

mail.setApiKey(process.env.EMAIL_SENDGRID_KEY);

load(path.resolve(__dirname, process.env.EMAIL_TEMPLATES_PATH));

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
        password,
      },
    }),
  };

  console.log({ sendWelcome: { msg } });
  mail.send(msg);
}

export function sendVerify({ emailTo, token }) {
  const tokenUrl = `${urlVerifyAccount}${token}`;

  const msg = {
    to: emailTo,
    from: emailDefaultSender,
    subject: `Verify your ${app} account`,
    ...compile({
      templateName: 'verify-your-account',
      context: {
        email: emailTo,
        app,
        emailContact: emailContactMail,
        tokenUrl,
      },
    }),
  };

  console.log({ sendVerify: { msg } });
  mail.send(msg);
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
        fullname,
      },
    }),
  };

  console.log({ sendVerification: { msg } });
  mail.send(msg);
}

export function sendResetPassword({ emailTo, token }) {
  const tokenUrl = `${urlChangePassword}${token}`;

  const msg = {
    to: emailTo,
    from: emailDefaultSender,
    subject: `You told us you forgot your password`,
    body: compile({
      templateName: 'reset-password',
      context: {
        email: emailTo,
        app,
        tokenUrl,
      },
    }).html,
  };

  console.log({ sendResetPassword: { msg } });
  mail.send(msg);
}

export function sendPasswordChanged({ emailTo, password, fullname }) {
  const msg = {
    to: emailTo,
    from: emailDefaultSender,
    subject: `Your password has been changed`,
    ...compile({
      templateName: 'password-changed',
      context: {
        email: emailTo,
        app,
        password,
        fullname,
      },
    }),
  };

  console.log({ sendPasswordChanged: { msg } });
  mail.send(msg);
}
