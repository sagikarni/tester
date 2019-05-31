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

import axios from 'axios';
import { print } from 'graphql';
import { chain } from 'lodash';

export interface IStripsState {
  collection: any[];
}

@Module({ dynamic: true, store, name: 'strips' })
class Strips extends VuexModule implements IStripsState {
  public collection = [];

  @Action({ commit: 'SET_COLLECTION' })
  async loadStrips() {
    const query = gql`
      {
        stripsMany {
          _id
          name
          groups {
            _id
            name
            items
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

    return res2.data.data.stripsMany;
  }

  @Action({ commit: 'SET_COLLECTION' })
  async save(collections) {
    // mutation updateOrCreate($collections: [StripsInput!]) {
    const query = gql`
      mutation($collections: [JSON!]) {
        stripsUpdateOrCreate(collections: $collections) {
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

export const StripsModule = getModule(Strips);
