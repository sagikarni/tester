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

export interface IDomainState {
  domains: any[];
  types: any[];
}

@Module({ dynamic: true, store, name: 'domain' })
class Domain extends VuexModule implements IDomainState {
  public domains = [];
  public types = [];

  @Action({ commit: 'SET_DOMAINS' })
  async loadDomains() {
    const query = gql`
      {
        activityTypeMany {
          _id
          name
          domain {
            name
            _id
          }
        }

        domainMany {
          _id
          name
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

    return {
      type: res2.data.data.activityTypeMany,
      domain: res2.data.data.domainMany,
    };
  }

  @Mutation
  private SET_DOMAINS(raw: any) {
    this.types = raw.type;
    this.domains = raw.domain;
  }
}

export const DomainModule = getModule(Domain);
