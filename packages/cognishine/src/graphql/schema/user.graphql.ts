import { GraphQLNonNull, GraphQLString, GraphQLObjectType } from 'graphql';
import { composeWithMongoose, GraphQLMongoID } from 'graphql-compose-mongoose';
import {
  requirePermission,
  requireRule,
} from '../../auth/graphql-resolver-wrappers';

import { TYPE_COMPOSER as userRoleType } from './graphql-user-role';
import { login } from './login';
import { User, UserRole } from '../../mongodb';

const UserTC = composeWithMongoose(User, {
  fields: { remove: ['role', 'password'] },
});

export const TYPE_COMPOSER = UserTC;

UserTC.addRelation('role', {
  resolver: userRoleType.get('$findById'),
  prepareArgs: { _id: (source) => source.role },
  projection: { role: true },
});

UserTC.addResolver({
  name: 'currentUser',
  type: UserTC.getType(),
  resolve: currentUserResolver,
});

UserTC.addResolver({
  name: 'grantUserById',
  type: UserTC.getType(),
  args: {
    userId: { type: new GraphQLNonNull(GraphQLMongoID) },
    roleName: { type: 'String!' },
  },
  resolve: grantUserByIdResolver,
});

UserTC.addResolver({
  name: 'login',
  args: {
    email: { type: 'String!' },
    password: { type: 'String!' },
  },
  type: new GraphQLObjectType({
    name: 'login',
    fields: () => ({
      token: { type: GraphQLString },
      user: { type: UserTC.getType() },
    }),
  }),
  resolve: async ({ args, context }) => {
    const { email, password } = args;
    return login({ email, password });
  },
});

export const QUERIES = {
  login: UserTC.get('$login'),
  currentUser: UserTC.get('$currentUser'),
  userById: UserTC.get('$findById'),
  userConnection: UserTC.get('$connection'),
  ...requireRule('admin', {
    user: UserTC.get('$findOne'),
  }),
};

export const MUTATIONS = {
  ...requirePermission('users#list-read', {
    createUser: UserTC.get('$createOne'),
    updateUser: UserTC.get('$updateById'),
    removeUserById: UserTC.get('$removeById'),
    grantUserById: UserTC.get('$grantUserById'),
  }),
};

async function currentUserResolver({ context }: any): Promise<any> {
  console.log('in currentUserResolver');
  debugger;
  return context.user;
}

async function grantUserByIdResolver({ args }: any): Promise<any> {
  debugger;

  console.log('in grantUserByIdResolver');
  const role = await UserRole.findOne({ name: args.roleName });

  return User.findByIdAndUpdate(args.userId, { $set: { role } }, { new: true });
}
