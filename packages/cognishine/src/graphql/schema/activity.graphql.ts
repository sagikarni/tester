import composeWithMongoose from 'graphql-compose-mongoose';
import { Activity } from '../../mongodb';
import mongoose from 'mongoose';
import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

const ActivityTC = composeWithMongoose(Activity);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
// https://graphqlmastery.com/blog/graphql-list-how-to-use-arrays-in-graphql-schema
ActivityTC.addResolver({
  name: 'updateOrCreate',
  args: {
    collections: {
      type: ['JSON!'], // ActivityCollectionTC.getITC()],
    },
  },
  type: new GraphQLNonNull(
    new GraphQLList(new GraphQLNonNull(ActivityTC.getType()))
  ),

  // type: new GraphQLList(
  //   new GraphQLObjectType({
  //     name: 'updateOrCreate',
  //     fields: () => ({ records: { type: ActivityTC.getType() } }),
  //   })
  // ),

  // type: new GraphQLObjectType({
  //   name: 'updateOrCreate',
  //   fields: () => ([
  //     { records: { type: ActivityTC.getType() } }
  //   ]),
  // }),
  // type: ActivityTC.getType(),
  resolve: async ({ source, args, context, info }) => {
    debugger;

    const cols = [];

    await asyncForEach(args.collections, async (collection) => {
      if (!collection._id) {
        collection._id = mongoose.Types.ObjectId();
      }

      cols.push(
        await Activity.findByIdAndUpdate(collection._id, collection, {
          upsert: true,
          setDefaultsOnInsert: true,
          new: true,
        })
      );
    });

    return cols;
  },
});

export const QUERIES = {
  activityById: ActivityTC.getResolver('findById'),
  activityByIds: ActivityTC.getResolver('findByIds'),
  activityOne: ActivityTC.getResolver('findOne'),
  activityMany: ActivityTC.getResolver('findMany'),
  activityCount: ActivityTC.getResolver('count'),
  activityConnection: ActivityTC.getResolver('connection'),
  activityPagination: ActivityTC.getResolver('pagination'),
};

export const MUTATIONS = {
  activityCreateOne: ActivityTC.getResolver('createOne'),
  activityCreateMany: ActivityTC.getResolver('createMany'),
  activityUpdateById: ActivityTC.getResolver('updateById'),
  activityUpdateOne: ActivityTC.getResolver('updateOne'),
  activityUpdateMany: ActivityTC.getResolver('updateMany'),
  activityRemoveById: ActivityTC.getResolver('removeById'),
  activityRemoveOne: ActivityTC.getResolver('removeOne'),
  activityRemoveMany: ActivityTC.getResolver('removeMany'),

  activityUpdateOrCreate: ActivityTC.getResolver('updateOrCreate'),
};
