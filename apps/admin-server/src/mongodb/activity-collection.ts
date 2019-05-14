import mongoose, { Document, Schema } from 'mongoose';

export interface IActivityCollection {
  name: string;
  items: any;
}

export interface IMongooseActivityCollection
  extends IActivityCollection,
    Document {}

const ActivityCollectionSchema = new Schema({
  name: { type: String, unique: true, index: true },
  items: [
    {
      name: { type: String },
      activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    },
  ],
});

export const ActivityCollection = mongoose.model<IMongooseActivityCollection>(
  'Activity-Collection',
  ActivityCollectionSchema
);
