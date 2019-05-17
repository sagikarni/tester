import composeWithMongoose from 'graphql-compose-mongoose';
import { Articulation } from '../../mongodb';
import { GraphQLNonNull, GraphQLList } from 'graphql';
import mongoose from 'mongoose';

const ArticulationTC = composeWithMongoose(Articulation);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
// https://graphqlmastery.com/blog/graphql-list-how-to-use-arrays-in-graphql-schema
ArticulationTC.addResolver({
  name: 'updateOrCreate',
  args: {
    collections: {
      type: ['JSON!'], // articulationTC.getITC()],
    },
  },
  type: new GraphQLNonNull(
    new GraphQLList(new GraphQLNonNull(ArticulationTC.getType()))
  ),
  resolve: async ({ source, args, context, info }) => {
    debugger;

    const cols = [];

    await asyncForEach(args.collections, async (collection) => {
      if (!collection._id) {
        collection._id = mongoose.Types.ObjectId();
      }

      cols.push(
        await Articulation.findByIdAndUpdate(collection._id, collection, {
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
  articulationById: ArticulationTC.getResolver('findById'),
  articulationByIds: ArticulationTC.getResolver('findByIds'),
  articulationOne: ArticulationTC.getResolver('findOne'),
  articulationMany: ArticulationTC.getResolver('findMany'),
  articulationCount: ArticulationTC.getResolver('count'),
  articulationConnection: ArticulationTC.getResolver('connection'),
  articulationPagination: ArticulationTC.getResolver('pagination'),
};

export const MUTATIONS = {
  articulationCreateOne: ArticulationTC.getResolver('createOne'),
  articulationCreateMany: ArticulationTC.getResolver('createMany'),
  articulationUpdateById: ArticulationTC.getResolver('updateById'),
  articulationUpdateOne: ArticulationTC.getResolver('updateOne'),
  articulationUpdateMany: ArticulationTC.getResolver('updateMany'),
  articulationRemoveById: ArticulationTC.getResolver('removeById'),
  articulationRemoveOne: ArticulationTC.getResolver('removeOne'),
  articulationRemoveMany: ArticulationTC.getResolver('removeMany'),

  articulationUpdateOrCreate: ArticulationTC.getResolver('updateOrCreate'),
};
