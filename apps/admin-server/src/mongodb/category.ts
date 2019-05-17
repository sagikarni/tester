import mongoose, { Document, Schema } from 'mongoose';
import { SubCategory } from './subcategory';

export interface ICategory {
  name: string;
}

export interface IMongooseCategory extends ICategory, Document {}

const CategorySchema = new Schema({
  name: { type: String, unique: true, index: true },
});

CategorySchema.post('remove', async (doc) => {
  await SubCategory.remove({ category: new mongoose.mongo.ObjectId(doc._id) });
});

export const Category = mongoose.model<IMongooseCategory>(
  'Category',
  CategorySchema
);
