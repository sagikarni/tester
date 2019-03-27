import mongoose, { connect, connection } from 'mongoose';

mongoose.set('debug', true);

export const db = {
  connect: () => connect(process.env.MONGODB_URI),
  connection  
};

export * from './user';
