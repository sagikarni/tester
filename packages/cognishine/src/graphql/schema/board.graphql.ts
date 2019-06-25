import composeWithMongoose from 'graphql-compose-mongoose';
import { Board } from '../../mongodb';
import { GraphQLNonNull, GraphQLList } from 'graphql';
import mongoose from 'mongoose';

const BoardTC = composeWithMongoose(Board);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
// https://graphqlmastery.com/blog/graphql-list-how-to-use-arrays-in-graphql-schema
BoardTC.addResolver({
  name: 'updateOrCreate',
  args: {
    collections: {
      type: ['JSON!'], // articulationTC.getITC()],
    },
  },
  type: new GraphQLNonNull(
    new GraphQLList(new GraphQLNonNull(BoardTC.getType()))
  ),
  resolve: async ({ source, args, context, info }) => {
    debugger;

    const cols = [];

    await asyncForEach(args.collections, async (collection) => {
      if (!collection._id) {
        collection._id = mongoose.Types.ObjectId();
      }

      cols.push(
        await Board.findByIdAndUpdate(collection._id, collection, {
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
  boardById: BoardTC.getResolver('findById'),
  boardByIds: BoardTC.getResolver('findByIds'),
  boardOne: BoardTC.getResolver('findOne'),
  boardMany: BoardTC.getResolver('findMany'),
  boardCount: BoardTC.getResolver('count'),
  boardConnection: BoardTC.getResolver('connection'),
  boardPagination: BoardTC.getResolver('pagination'),
};

export const MUTATIONS = {
  boardCreateOne: BoardTC.getResolver('createOne'),
  boardCreateMany: BoardTC.getResolver('createMany'),
  boardUpdateById: BoardTC.getResolver('updateById'),
  boardUpdateOne: BoardTC.getResolver('updateOne'),
  boardUpdateMany: BoardTC.getResolver('updateMany'),
  boardRemoveById: BoardTC.getResolver('removeById'),
  boardRemoveOne: BoardTC.getResolver('removeOne'),
  boardRemoveMany: BoardTC.getResolver('removeMany'),

  boardUpdateOrCreate: BoardTC.getResolver('updateOrCreate'),
};
