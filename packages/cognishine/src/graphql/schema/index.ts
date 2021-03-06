import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

import * as fromUser from './user.graphql';
import * as fromActivity from './activity.graphql';
import * as fromArticulation from './articulation.graphql';
import * as fromCategory from './category.graphql';
import * as fromSubCategory from './sub-category.graphql';
import * as fromDomain from './domain.graphql';
import * as fromActivityType from './activity-type.graphql';
import * as fromStrips from './strips.graphql';
import * as fromBoard from './board.graphql';
import * as fromPlan from './plan.graphql';
import * as fromPurchases from './purchases.graphql';

schemaComposer.Query.addFields({
  ...fromUser.QUERIES,
  ...fromActivity.QUERIES,
  ...fromArticulation.QUERIES,
  ...fromCategory.QUERIES,
  ...fromSubCategory.QUERIES,
  ...fromDomain.QUERIES,
  ...fromActivityType.QUERIES,
  ...fromStrips.QUERIES,
  ...fromBoard.QUERIES,
  ...fromPlan.QUERIES,
  ...fromPurchases.QUERIES,
});

schemaComposer.Mutation.addFields({
  ...fromStrips.MUTATIONS,
  ...fromCategory.MUTATIONS,
  ...fromSubCategory.MUTATIONS,
  ...fromActivity.MUTATIONS,
  ...fromArticulation.MUTATIONS,
  ...fromBoard.MUTATIONS,
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;
