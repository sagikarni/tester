// import { IGraphQlFields } from 'graphql-compose';
import composeWithMongoose from 'graphql-compose-mongoose';
import { Domain } from '../../mongodb';

const DomainTC = composeWithMongoose(Domain, { name: 'ActivityDomain' });

export const TYPE_COMPOSER = DomainTC;

export const QUERIES = {
  // : IGraphQlFields = {
  domainById: DomainTC.getResolver('findById'),
  domainByIds: DomainTC.getResolver('findByIds'),
  domainOne: DomainTC.getResolver('findOne'),
  domainMany: DomainTC.getResolver('findMany'),
  domainCount: DomainTC.getResolver('count'),
  domainConnection: DomainTC.getResolver('connection'),
  domainPagination: DomainTC.getResolver('pagination'),
};

export const MUTATIONS = {
  // : IGraphQlFields = {
};
