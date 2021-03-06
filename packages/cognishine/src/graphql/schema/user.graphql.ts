import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
} from 'graphql';
import { composeWithMongoose, GraphQLMongoID } from 'graphql-compose-mongoose';
import {
  requirePermission,
  requireRule,
  requireToken,
} from '../../auth/graphql-resolver-wrappers';

import { TYPE_COMPOSER as userRoleType } from './graphql-user-role';
import {
  login,
  register,
  recoverAccount,
  verifyAccount,
  reverifyAccount,
  changePassword,
} from './login';
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

    const { token, user } = await login({ email, password });

    context.res.set('ACCESS_TOKEN', token);

    return { token, user };
  },
});

UserTC.addResolver({
  name: 'register',
  args: {
    name: { type: 'String!' },
    email: { type: 'String!' },
    password: { type: 'String!' },
  },
  type: new GraphQLObjectType({
    name: 'register',
    fields: () => ({
      token: { type: GraphQLString },
      user: { type: UserTC.getType() },
    }),
  }),
  resolve: async ({ args, context }) => {
    const { email, password, name } = args;

    const { token, user, verifyToken } = await register({
      name,
      email,
      password,
    });

    context.res.set('VERIFY_TOKEN', verifyToken);
    context.res.set('ACCESS_TOKEN', token);

    return { token, user };
  },
});

UserTC.addResolver({
  name: 'recoverAccount',
  args: {
    email: { type: 'String!' },
  },
  type: new GraphQLObjectType({
    name: 'recoverAccount',
    fields: () => ({
      result: { type: GraphQLBoolean },
    }),
  }),
  resolve: async ({ args, context }) => {
    const { email } = args;

    const { token } = await recoverAccount({ email });

    context.res.set('RESET_TOKEN', token);
    // context.res.set('ACCESS_TOKEN', token);

    return { result: true };
  },
});

UserTC.addResolver({
  name: 'changePassword',
  args: {
    password: { type: 'String!' },
  },
  type: new GraphQLObjectType({
    name: 'changePassword',
    fields: () => ({
      token: { type: GraphQLString },
      user: { type: UserTC.getType() },
    }),
  }),
  resolve: async ({ args, context }) => {
    const { token, user } = await changePassword({
      password: args.password,
      user: context.user,
    });

    context.res.set('ACCESS_TOKEN', token);

    return { token, user };
  },
});

UserTC.addResolver({
  name: 'verifyAccount',
  type: new GraphQLObjectType({
    name: 'verifyAccount',
    fields: () => ({
      token: { type: GraphQLString },
      user: { type: UserTC.getType() },
    }),
  }),
  resolve: async ({ args, context }) => {
    const { token, user } = await verifyAccount({ user: context.user });

    context.res.set('ACCESS_TOKEN', token);

    return { token, user };
  },
});

UserTC.addResolver({
  name: 'reverifyAccount',
  type: new GraphQLObjectType({
    name: 'reverifyAccount',
    fields: () => ({
      result: { type: GraphQLBoolean },
    }),
  }),
  resolve: async ({ args, context }) => {
    const { user } = context;

    await reverifyAccount({ user });

    return { result: true };
  },
});

export const QUERIES = {
  login: UserTC.get('$login'),
  register: UserTC.get('$register'),
  recoverAccount: UserTC.get('$recoverAccount'),
  ...requireToken('bearer', 'access', {
    reverifyAccount: UserTC.get('$reverifyAccount'),
  }),
  ...requireToken('bearer', 'password', {
    changePassword: UserTC.get('$changePassword'),
  }),
  ...requireToken('bearer', 'verify', {
    verifyAccount: UserTC.get('$verifyAccount'),
  }),

  // currentUser: UserTC.get('$currentUser'),
  // userById: UserTC.get('$findById'),
  // userConnection: UserTC.get('$connection'),
  // ...requireRule('admin', {
  //   user: UserTC.get('$findOne'),
  // }),
};

export const MUTATIONS = {
  // ...requirePermission('users#list-read', {
  //   createUser: UserTC.get('$createOne'),
  //   updateUser: UserTC.get('$updateById'),
  //   removeUserById: UserTC.get('$removeById'),
  //   grantUserById: UserTC.get('$grantUserById'),
  // }),
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
