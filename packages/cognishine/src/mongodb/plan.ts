import mongoose, { Document, Schema } from 'mongoose';

export interface IPlan {
  name: string;
  price: {
    currency: string;
    figure: number;
  };
  active: boolean;
  category: string;
  recommended: boolean;
  defaultUrl: string;
  level: number;
  licenses: {
    value: number;
    max?: number;
    min?: number;
  };
  role: any;
}

export interface IMongoosePlan extends IPlan, Document {}

const PlanSchema = new Schema({
  name: { type: String },
  price: {
    currency: { type: String },
    figure: { type: Number },
  },
  category: { type: String, enum: ['monthly', 'yearly'] },
  recommended: { type: Boolean },
  active: { type: Boolean, default: true },
  defaultUrl: { type: String },
  level: { type: Number },
  role: { type: Schema.Types.ObjectId, ref: 'UserRole' },
  licenses: {
    value: { type: Number },
    max: { type: Number },
    min: { type: Number },
  },
});

export const Plan = mongoose.model<IMongoosePlan>('Plan', PlanSchema);
