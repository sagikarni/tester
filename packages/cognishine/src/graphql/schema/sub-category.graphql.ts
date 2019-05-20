// import { IGraphQlFields } from 'graphql-compose';
import composeWithMongoose from 'graphql-compose-mongoose';
import { SubCategory } from '../../mongodb';
import { TYPE_COMPOSER as CategoryTC } from './category.graphql';

const SubCategoryTC = composeWithMongoose(SubCategory);

export const TYPE_COMPOSER = SubCategoryTC;

SubCategoryTC.addRelation('category', {
  resolver: CategoryTC.get('$findById'),
  prepareArgs: { _id: (source) => source.category },
  projection: { category: true },
});

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
  subCategoryCreateOne: SubCategoryTC.getResolver('createOne'),
  subCategoryCreateMany: SubCategoryTC.getResolver('createMany'),
  subCategoryUpdateById: SubCategoryTC.getResolver('updateById'),
  subCategoryUpdateOne: SubCategoryTC.getResolver('updateOne'),
  subCategoryUpdateMany: SubCategoryTC.getResolver('updateMany'),
  subCategoryRemoveById: SubCategoryTC.getResolver('removeById'),
  subCategoryRemoveOne: SubCategoryTC.getResolver('removeOne'),
  subCategoryRemoveMany: SubCategoryTC.getResolver('removeMany'),
};
