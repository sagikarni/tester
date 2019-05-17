import composeWithMongoose from 'graphql-compose-mongoose';
import { ActivityCollection } from '../../mongodb';
import { GraphQLJSON } from 'graphql-compose';
import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import mongoose from 'mongoose';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const ActivityCollectionTC = composeWithMongoose(ActivityCollection, {
  name: 'ActivityCollection',
});

ActivityCollectionTC.addResolver({
  name: 'updateOrCreate',
  args: {
    collections: {
      type: ['JSON!'], // ActivityCollectionTC.getITC()],
    },
  },
  type: ActivityCollectionTC.getType(),
  resolve: async ({ source, args, context, info }) => {
    debugger;

    await asyncForEach(args.collections, async (collection) => {
      if (!collection._id) {
        collection._id = mongoose.Types.ObjectId();
      }

      await ActivityCollection.findByIdAndUpdate(collection._id, collection, {
        upsert: true,
        setDefaultsOnInsert: true,
      });
    });

    return await ActivityCollection.find({});
  },
});

export const QUERIES = {
  activityCollectionById: ActivityCollectionTC.getResolver('findById'),
  activityCollectionByIds: ActivityCollectionTC.getResolver('findByIds'),
  activityCollectionOne: ActivityCollectionTC.getResolver('findOne'),
  activityCollectionMany: ActivityCollectionTC.getResolver('findMany'),
  activityCollectionCount: ActivityCollectionTC.getResolver('count'),
  activityCollectionConnection: ActivityCollectionTC.getResolver('connection'),
  activityCollectionPagination: ActivityCollectionTC.getResolver('pagination'),
};

export const MUTATIONS = {
  activityCollectionCreateOne: ActivityCollectionTC.getResolver('createOne'),
  activityCollectionCreateMany: ActivityCollectionTC.getResolver('createMany'),
  activityCollectionUpdateById: ActivityCollectionTC.getResolver('updateById'),
  activityCollectionUpdateOne: ActivityCollectionTC.getResolver('updateOne'),
  activityCollectionUpdateMany: ActivityCollectionTC.getResolver('updateMany'),
  activityCollectionRemoveById: ActivityCollectionTC.getResolver('removeById'),
  activityCollectionRemoveOne: ActivityCollectionTC.getResolver('removeOne'),
  activityCollectionRemoveMany: ActivityCollectionTC.getResolver('removeMany'),

  activityCollectionUpdateOrCreate: ActivityCollectionTC.getResolver(
    'updateOrCreate'
  ),
};
