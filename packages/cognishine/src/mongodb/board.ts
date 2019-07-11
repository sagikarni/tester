import mongoose, { Document, Schema } from 'mongoose';
import { types } from './types';

export interface IBoard {
  name: string;
  user: any;
  items: any[];
}

export interface IMongooseBoard extends IBoard, Document {}

const BoardSchema = new Schema(
  {
    name: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Board = mongoose.model<IMongooseBoard>('Board', BoardSchema);
