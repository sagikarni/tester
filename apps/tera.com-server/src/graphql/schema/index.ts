import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

import { Activity, ActivityType, Category, ActivityCollection } from '../../models';

const ActivityTC = composeWithMongoose(Activity);
const CategoryTC = composeWithMongoose(Category);
const ActivityTypeTC = composeWithMongoose(ActivityType, {
  name: 'ActivityType',
});
const ActivityCollectionTC = composeWithMongoose(ActivityCollection, {
  name: 'ActivityCollection',
});

ActivityTC.addRelation('type', {
  resolver: ActivityTypeTC.getResolver('findById'),
  prepareArgs: {
    _id: (source: any) => source.type._id,
  },
  projection: { type: true },
});

ActivityTC.addRelation('category', {
  resolver: CategoryTC.getResolver('findById'),
  prepareArgs: {
    _id: (source: any) => source.category._id,
  },
  projection: { category: true },
});

// ActivityCollectionTC.addRelation('items', {
//   resolver: ActivityTC.getResolver('findById'),
//   prepareArgs: {
//     _id: (source: any) => {
//       console.log({ source });
//       return source._id;
//     }
//   },
//   projection: { activity: true },
// });

schemaComposer.Query.addFields({
  activityById: ActivityTC.getResolver('findById'),
  activityByIds: ActivityTC.getResolver('findByIds'),
  activityOne: ActivityTC.getResolver('findOne'),
  activityMany: ActivityTC.getResolver('findMany'),
  activityCount: ActivityTC.getResolver('count'),
  activityConnection: ActivityTC.getResolver('connection'),
  activityPagination: ActivityTC.getResolver('pagination'),
});


schemaComposer.Query.addFields({
  activityCollectionById: ActivityCollectionTC.getResolver('findById'),
  activityCollectionByIds: ActivityCollectionTC.getResolver('findByIds'),
  activityCollectionOne: ActivityCollectionTC.getResolver('findOne'),
  activityCollectionMany: ActivityCollectionTC.getResolver('findMany'),
  activityCollectionCount: ActivityCollectionTC.getResolver('count'),
  activityCollectionConnection: ActivityCollectionTC.getResolver('connection'),
  activityCollectionPagination: ActivityCollectionTC.getResolver('pagination'),
});

const graphqlSchema = schemaComposer.buildSchema();
export default graphqlSchema;
