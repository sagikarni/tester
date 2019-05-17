import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store';
import { flatten, values } from 'lodash';
import gql from 'graphql-tag';

import request from '../../utils/request';
import axios from 'axios';
import { print } from 'graphql';
import { chain } from 'lodash';

export interface IActivityCollectionState {
  collection: any[];
}

@Module({ dynamic: true, store, name: 'activityCollection' })
class ActivityCollection extends VuexModule
  implements IActivityCollectionState {
  public collection = [];

  @Action({ commit: 'SET_COLLECTION' })
  async loadActivitiesCollection() {
    const query = gql`
      {
        activityCollectionMany {
          _id
          name
          items {
            _id
            name
            activities
          }
        }
      }
    `;

    console.log({ query });

    const res2 = await axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: print(query),
      },
    });

    return res2.data.data.activityCollectionMany;
  }

  @Action({ commit: 'SET_COLLECTION' })
  async save(collections) {
    // mutation updateOrCreate($collections: [ActivityCollectionInput!]) {
    const query = gql`
      mutation($collections: [JSON!]) {
        activityCollectionUpdateOrCreate(collections: $collections) {
          name
        }
      }
    `;

    const res2 = await axios({
      url: '/graphql',
      method: 'post',
      data: {
        query: print(query),
        variables: {
          collections,
        },
      },
    });

    debugger;

    return collections; // res2.data.data.activityCollectionMany;
  }

  @Mutation
  private SET_COLLECTION(raw: any) {
    this.collection = raw;
  }
}

export const ActivityCollectionModule = getModule(ActivityCollection);
