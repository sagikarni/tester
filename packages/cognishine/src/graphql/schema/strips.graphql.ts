import composeWithMongoose from 'graphql-compose-mongoose';
import { Strips } from '../../mongodb';
import { GraphQLJSON } from 'graphql-compose';
import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import mongoose from 'mongoose';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const StripsTC = composeWithMongoose(Strips, {
  name: 'Strips',
});

StripsTC.addResolver({
  name: 'updateOrCreate',
  args: {
    collections: {
      type: ['JSON!'], // StripsTC.getITC()],
    },
  },
  type: StripsTC.getType(),
  resolve: async ({ source, args, context, info }) => {
    debugger;

    await asyncForEach(args.collections, async (collection) => {
      if (!collection._id) {
        collection._id = mongoose.Types.ObjectId();
      }

      await Strips.findByIdAndUpdate(collection._id, collection, {
        upsert: true,
        setDefaultsOnInsert: true,
      });
    });

    return await Strips.find({});
  },
});

export const QUERIES = {
  stripsById: StripsTC.getResolver('findById'),
  stripsByIds: StripsTC.getResolver('findByIds'),
  stripsOne: StripsTC.getResolver('findOne'),
  stripsMany: StripsTC.getResolver('findMany'),
  stripsCount: StripsTC.getResolver('count'),
  stripsConnection: StripsTC.getResolver('connection'),
  stripsPagination: StripsTC.getResolver('pagination'),
};

export const MUTATIONS = {
  stripsCreateOne: StripsTC.getResolver('createOne'),
  stripsCreateMany: StripsTC.getResolver('createMany'),
  stripsUpdateById: StripsTC.getResolver('updateById'),
  stripsUpdateOne: StripsTC.getResolver('updateOne'),
  stripsUpdateMany: StripsTC.getResolver('updateMany'),
  stripsRemoveById: StripsTC.getResolver('removeById'),
  stripsRemoveOne: StripsTC.getResolver('removeOne'),
  stripsRemoveMany: StripsTC.getResolver('removeMany'),

  stripsUpdateOrCreate: StripsTC.getResolver('updateOrCreate'),
};
