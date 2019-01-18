import { User } from '../database';
import { AppHttpError } from 'express-zone';

// export const register = [
//   createUser(req => req.body)
// ];

export async function createUser({ name, email, password, verified }) {
  let user = await User.findOne({ email });
  if (user) {
    throw new AppHttpError(409, 'EMAIL_EXIST');
  }

  return await new User({ name, email, password, verified }).save();
}

// export async function sendWelcomeEmail({ getUser }) {
//   const user = getUser(req);
//   const { password } = req.body;

//   sendWelcome({ emailTo: user.email, password, fullname: user.name });
// }
