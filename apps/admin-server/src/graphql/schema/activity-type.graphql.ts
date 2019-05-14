// import { IGraphQlFields } from 'graphql-compose';
import composeWithMongoose from 'graphql-compose-mongoose';
import { ActivityType } from '../../mongodb';

const ActivityTypeTC = composeWithMongoose(ActivityType, {
  name: 'ActivityType',
});

export const TYPE_COMPOSER = ActivityTypeTC;

export const QUERIES = {
  // : IGraphQlFields = {
  activityTypeById: ActivityTypeTC.getResolver('findById'),
  activityTypeByIds: ActivityTypeTC.getResolver('findByIds'),
  activityTypeOne: ActivityTypeTC.getResolver('findOne'),
  activityTypeMany: ActivityTypeTC.getResolver('findMany'),
  activityTypeCount: ActivityTypeTC.getResolver('count'),
  activityTypeConnection: ActivityTypeTC.getResolver('connection'),
  activityTypePagination: ActivityTypeTC.getResolver('pagination'),
};

export const MUTATIONS = {
  // : IGraphQlFields = {
};
