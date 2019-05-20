import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from './category';

export interface ISubCategory {
  name: string;
  category: ICategory;
}

export interface IMongooseSubCategory extends ISubCategory, Document {}

const SubCategorySchema = new Schema({
  name: { type: String, unique: true, index: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

export const SubCategory = mongoose.model<IMongooseSubCategory>(
  'SubCategory',
  SubCategorySchema
);
