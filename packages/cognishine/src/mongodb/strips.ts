import mongoose, { Document, Schema } from 'mongoose';

export interface IStrips {
  name: string;
  items: any;
}

export interface IMongooseStrips extends IStrips, Document {}

const StripsSchema = new Schema({
  name: { type: String, unique: true, index: true },
  groups: [
    {
      name: { type: String },
      items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    },
  ],
});

export const Strips = mongoose.model<IMongooseStrips>('Strips', StripsSchema);
