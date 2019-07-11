import composeWithMongoose from 'graphql-compose-mongoose';
import { Board, User } from '../../mongodb';
import { GraphQLNonNull, GraphQLList } from 'graphql';

const BoardTC = composeWithMongoose(Board);

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
// https://graphqlmastery.com/blog/graphql-list-how-to-use-arrays-in-graphql-schema
BoardTC.addResolver({
  name: 'boardCreateOne',
  args: {
    name: { type: 'String!' },
  },
  type: new GraphQLNonNull(BoardTC.getType()),
  resolve: async ({ source, args, context, info }) => {
    const { name } = args;

    const user = await User.findById('5d2637aced78815a441c8400');

    const board = await new Board({ name, user: user._id }).save();

    return board;
  },
});

BoardTC.addResolver({
  name: 'boardCreateItemOne',
  args: {
    id: { type: 'String!' },
    item: { type: 'String!' },
  },
  type: new GraphQLNonNull(BoardTC.getType()),
  resolve: async ({ source, args, context, info }) => {
    const { id, item } = args;

    const user = await User.findById('5d2637aced78815a441c8400');

    const boardx = await Board.findOne({ _id: id, user: user._id });

    boardx.items = [...boardx.items, item];

    const board = await boardx.save();
    return board;
  },
});

BoardTC.addResolver({
  name: 'boardRenameOne',
  args: {
    id: { type: 'String!' },
    item: { type: 'String!' },
  },
  type: new GraphQLNonNull(BoardTC.getType()),
  resolve: async ({ source, args, context, info }) => {
    const { id, item } = args;

    const user = await User.findById('5d2637aced78815a441c8400');

    const boardx = await Board.findOne({ _id: id, user: user._id });

    boardx.items = [...boardx.items, item];

    const board = await boardx.save();
    return board;
  },
});

BoardTC.addResolver({
  name: 'boardRemoveOne',
  args: {
    id: { type: 'String!' },
  },
  // type: new GraphQLNonNull(BoardTC.getType()),
  resolve: async ({ source, args, context, info }) => {
    const { id } = args;

    const user = await User.findById('5d2637aced78815a441c8400');

    await Board.deleteOne({ _id: id, user: user._id });
  },
});

BoardTC.addResolver({
  name: 'boardRemoveItemOne',
  args: {
    id: { type: 'String!' },
    item: { type: 'String!' },
  },
  type: new GraphQLNonNull(BoardTC.getType()),
  resolve: async ({ source, args, context, info }) => {
    const { id, item } = args;

    const user = await User.findById('5d2637aced78815a441c8400');

    const boardx = await Board.findOne({ _id: id, user: user._id });

    boardx.items = boardx.items.filter((b) => b !== item);

    const board = await boardx.save();
    return board;
  },
});

BoardTC.addResolver({
  name: 'boardRenameOne',
  args: {
    id: { type: 'String!' },
    name: { type: 'String!' },
  },
  type: new GraphQLNonNull(BoardTC.getType()),
  resolve: async ({ source, args, context, info }) => {
    const { id, name } = args;

    const user = await User.findById('5d2637aced78815a441c8400');

    const boardx = await Board.findOne({ _id: id, user: user._id });
    boardx.name = name;

    const board = await boardx.save();
    return board;
  },
});

BoardTC.addResolver({
  name: 'boardMany',
  type: new GraphQLList(new GraphQLNonNull(BoardTC.getType())),
  resolve: async ({ source, args, context, info }) => {
    const user = await User.findById('5d2637aced78815a441c8400');

    const boardx = await Board.find({ user: user._id });

    return boardx;
  },
});

export const QUERIES = {
  boardMany: BoardTC.getResolver('boardMany'),

  // boardById: BoardTC.getResolver('findById'),
  // boardByIds: BoardTC.getResolver('findByIds'),
  // boardOne: BoardTC.getResolver('findOne'),
  // boardMany: BoardTC.getResolver('findMany'),
  // boardCount: BoardTC.getResolver('count'),
  // boardConnection: BoardTC.getResolver('connection'),
  // boardPagination: BoardTC.getResolver('pagination'),
};

export const MUTATIONS = {
  // ...requireToken('bearer', 'access', {
  boardCreateOne: BoardTC.getResolver('boardCreateOne'),
  boardCreateItemOne: BoardTC.getResolver('boardCreateItemOne'),
  boardRenameOne: BoardTC.getResolver('boardRenameOne'),
  boardRemoveOne: BoardTC.getResolver('boardRemoveOne'),
  boardRemoveItemOne: BoardTC.getResolver('boardRemoveItemOne'),
  // }),

  // boardCreateOne: BoardTC.getResolver('createOne'),
  // boardCreateMany: BoardTC.getResolver('createMany'),
  // boardUpdateById: BoardTC.getResolver('updateById'),
  // boardUpdateOne: BoardTC.getResolver('updateOne'),
  // boardUpdateMany: BoardTC.getResolver('updateMany'),
  // boardRemoveById: BoardTC.getResolver('removeById'),
  // boardRemoveOne: BoardTC.getResolver('removeOne'),
  // boardRemoveMany: BoardTC.getResolver('removeMany'),

  // boardUpdateOrCreate: BoardTC.getResolver('updateOrCreate'),
};
