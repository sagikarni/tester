// import { IGraphQlFields } from 'graphql-compose';
import composeWithMongoose from 'graphql-compose-mongoose';
import { Category } from '../../mongodb';

const CategoryTC = composeWithMongoose(Category);

export const TYPE_COMPOSER = CategoryTC;

export const QUERIES = {
  // : IGraphQlFields = {
  categoryById: CategoryTC.getResolver('findById'),
  categoryByIds: CategoryTC.getResolver('findByIds'),
  categoryOne: CategoryTC.getResolver('findOne'),
  categoryMany: CategoryTC.getResolver('findMany'),
  categoryCount: CategoryTC.getResolver('count'),
  categoryConnection: CategoryTC.getResolver('connection'),
  categoryPagination: CategoryTC.getResolver('pagination'),
};

export const MUTATIONS = {
  // : IGraphQlFields = {
};
