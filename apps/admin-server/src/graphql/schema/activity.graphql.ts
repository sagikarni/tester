import composeWithMongoose from 'graphql-compose-mongoose';
import { Activity } from '../../mongodb';

const ActivityTC = composeWithMongoose(Activity);

export const QUERIES = {
  activityById: ActivityTC.getResolver('findById'),
  activityByIds: ActivityTC.getResolver('findByIds'),
  activityOne: ActivityTC.getResolver('findOne'),
  activityMany: ActivityTC.getResolver('findMany'),
  activityCount: ActivityTC.getResolver('count'),
  activityConnection: ActivityTC.getResolver('connection'),
  activityPagination: ActivityTC.getResolver('pagination'),
};
