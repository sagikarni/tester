import mongoose from 'mongoose';

export const db = {
  connect: () => mongoose.connect(process.env.MONGODB_URI),
  connection: mongoose.connection,
  
};

export * from './user';
