import mongoose, { Document, Schema } from 'mongoose';
import { types } from './types';

export interface IActivity {
  name: string;
}

export interface IMongooseActivity extends IActivity, Document {}

const ActivitySchema = new Schema(
  {
    name: { type: String },
    type: { type: Schema.Types.ObjectId, ref: 'Activity-Type' },
    description: { type: String },
    free: { type: Boolean },
    printable: { type: Boolean },
    editorial: { type: Boolean },
    level: { type: [String], enum: types.level },
    notes: { type: String },
    orientation: { type: String, enum: types.orientation },
    mediaType: { type: String, enum: types.mediaType },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    subCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    status: { type: String, enum: types.status },
    audience: { type: String, enum: types.audience },
    isolate: { type: Boolean },
    model: {
      slideCategories: [String],
      slides: [
        {
          media: [{ name: { type: String } }],
          phrases: [String],
          category: { type: String },
          size: { type: String },
          audio: [{ name: { type: String } }],
          mediaIndex: { type: String },
        },
      ],
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Activity = mongoose.model<IMongooseActivity>(
  'Activity',
  ActivitySchema
);
