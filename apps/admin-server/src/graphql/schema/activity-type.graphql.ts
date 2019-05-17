// import { IGraphQlFields } from 'graphql-compose';
import composeWithMongoose from 'graphql-compose-mongoose';
import { ActivityType } from '../../mongodb';
import { TYPE_COMPOSER as DomainTC } from './domain.graphql';

const ActivityTypeTC = composeWithMongoose(ActivityType, {
  name: 'ActivityType',
});

export const TYPE_COMPOSER = ActivityTypeTC;

ActivityTypeTC.addRelation('domain', {
  resolver: DomainTC.get('$findById'),
  prepareArgs: { _id: (source) => source.domain },
  projection: { domain: true },
});

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
