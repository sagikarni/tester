import composeWithMongoose from 'graphql-compose-mongoose';
import { Plan, User } from '../../mongodb';
import { GraphQLNonNull, GraphQLList } from 'graphql';

const PlanTC = composeWithMongoose(Plan);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const QUERIES = {
  planById: PlanTC.getResolver('findById'),
  planByIds: PlanTC.getResolver('findByIds'),
  planOne: PlanTC.getResolver('findOne'),
  planMany: PlanTC.getResolver('findMany'),
  planCount: PlanTC.getResolver('count'),
  planConnection: PlanTC.getResolver('connection'),
  planPagination: PlanTC.getResolver('pagination'),
};
