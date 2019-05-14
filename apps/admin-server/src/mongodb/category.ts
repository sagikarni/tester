import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory {
  name: string;
}

export interface IMongooseCategory extends ICategory, Document {}

const CategorySchema = new Schema({
  name: { type: String, unique: true, index: true },
});

export const Category = mongoose.model<IMongooseCategory>(
  'Category',
  CategorySchema
);
