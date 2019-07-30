import bcrypt from 'bcryptjs';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile {
  user: any;
  purchases: any;
}

export interface IMongoosePurchase extends IUserProfile, Document {}

const PurchaseSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  purchases: [
    {
      plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
      status: { type: String },
      _raw: { type: String },
    },
  ],
});

export const Purchase = mongoose.model<IMongoosePurchase>(
  'Purchase',
  PurchaseSchema
);
