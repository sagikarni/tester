import mongoose, { Document, Schema } from 'mongoose';
import { types } from './types';

export interface IBoard {
  name: string;
}

export interface IMongooseBoard extends IBoard, Document {}

const BoardSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Board = mongoose.model<IMongooseBoard>('Board', BoardSchema);
