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

import { Purchase } from '../../mongodb';
import mongoose, { Document, Schema } from 'mongoose';

import { generateToken } from './token';

const PurchaseTC = composeWithMongoose(Purchase);

PurchaseTC.addResolver({
  name: 'newPurchase',
  args: {
    plan: { type: 'String!' },
  },
  type: new GraphQLObjectType({
    name: 'newPurchase',
    fields: () => ({
      token: { type: GraphQLString },
    }),
  }),
  resolve: async ({ args, context }) => {
    debugger;

    const { plan } = args;

    let userPurchase = await Purchase.findOne({ user: context.user });
    if (!userPurchase) {
      userPurchase = await new Purchase({ user: context.user }).save();
    }

    let purchasePlan = userPurchase.purchases.find(
      (p) => p.status === 'NEW' && p.plan.toString() === plan
    );
    if (!purchasePlan) {
      userPurchase.purchases.push({ status: 'NEW', plan });
      await userPurchase.save();
      purchasePlan = userPurchase.purchases.find(
        (p) => p.status === 'NEW' && p.plan.toString() === plan
      );
    }

    const token = await generateToken({
      _id: context.user._id,
      purchasePlan: purchasePlan._id.toString(),
      grant: 'purchase',
    });

    return { token };
  },
});

export const QUERIES = {
  ...requireToken('bearer', 'access', {
    newPurchase: PurchaseTC.get('$newPurchase'),
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
