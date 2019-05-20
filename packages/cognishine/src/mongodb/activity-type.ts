import mongoose, { Document, Schema } from 'mongoose';
import { IDomain } from './domain';

export interface IActivityType {
  name: string;
  domain: IDomain;
}

export interface IMongooseActivityType extends IActivityType, Document {}

const ActivityTypeSchema = new Schema({
  name: { type: String, unique: true, index: true },
  domain: { type: Schema.Types.ObjectId, ref: 'Activity-Domain' },
});

export const ActivityType = mongoose.model<IMongooseActivityType>(
  'Activity-Type',
  ActivityTypeSchema
);
