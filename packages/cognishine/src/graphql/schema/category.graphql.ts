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
  categoryCreateOne: CategoryTC.getResolver('createOne'),
  categoryCreateMany: CategoryTC.getResolver('createMany'),
  categoryUpdateById: CategoryTC.getResolver('updateById'),
  categoryUpdateOne: CategoryTC.getResolver('updateOne'),
  categoryUpdateMany: CategoryTC.getResolver('updateMany'),
  categoryRemoveById: CategoryTC.getResolver('removeById'),
  categoryRemoveOne: CategoryTC.getResolver('removeOne'),
  categoryRemoveMany: CategoryTC.getResolver('removeMany'),
};
