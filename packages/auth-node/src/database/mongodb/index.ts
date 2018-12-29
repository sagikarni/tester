import { connect, connection } from 'mongoose';

export const db = {
  connect: () => connect(process.env.MONGODB_URI),
  connection  
};

export * from './user';
