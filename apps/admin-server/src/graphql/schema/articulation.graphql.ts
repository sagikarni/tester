import composeWithMongoose from 'graphql-compose-mongoose';
import { Articulation } from '../../mongodb';

const ArticulationTC = composeWithMongoose(Articulation);

export const QUERIES = {
  articulationById: ArticulationTC.getResolver('findById'),
  articulationByIds: ArticulationTC.getResolver('findByIds'),
  articulationOne: ArticulationTC.getResolver('findOne'),
  articulationMany: ArticulationTC.getResolver('findMany'),
  articulationCount: ArticulationTC.getResolver('count'),
  articulationConnection: ArticulationTC.getResolver('connection'),
  articulationPagination: ArticulationTC.getResolver('pagination'),
};
