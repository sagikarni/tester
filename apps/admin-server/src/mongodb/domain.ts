import mongoose, { Document, Schema } from 'mongoose';

export interface IDomain {
  name: string;
}

export interface IMongooseDomain extends IDomain, Document {}

const DomainSchema = new Schema({
  name: { type: String, unique: true, index: true },
});

export const Domain = mongoose.model<IMongooseDomain>(
  'Activity-Domain',
  DomainSchema
);
