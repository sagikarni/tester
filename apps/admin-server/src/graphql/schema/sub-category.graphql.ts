// import { IGraphQlFields } from 'graphql-compose';
import composeWithMongoose from 'graphql-compose-mongoose';
import { SubCategory } from '../../mongodb';

const SubCategoryTC = composeWithMongoose(SubCategory);

export const TYPE_COMPOSER = SubCategoryTC;

export const QUERIES = {
  // : IGraphQlFields = {
  subCategoryById: SubCategoryTC.getResolver('findById'),
  subCategoryByIds: SubCategoryTC.getResolver('findByIds'),
  subCategoryOne: SubCategoryTC.getResolver('findOne'),
  subCategoryMany: SubCategoryTC.getResolver('findMany'),
  subCategoryCount: SubCategoryTC.getResolver('count'),
  subCategoryConnection: SubCategoryTC.getResolver('connection'),
  subCategoryPagination: SubCategoryTC.getResolver('pagination'),
};

export const MUTATIONS = {
  // : IGraphQlFields = {
};
