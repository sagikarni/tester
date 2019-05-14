import composeWithMongoose from 'graphql-compose-mongoose';
import { ActivityCollection } from '../../mongodb';

const ActivityCollectionTC = composeWithMongoose(ActivityCollection, {
  name: 'ActivityCollection',
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
