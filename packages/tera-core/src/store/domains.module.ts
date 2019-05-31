import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from './index';

import { Domain, ActivityType } from './entities';
import { gqlHttp } from '../gql-http';
import { LOAD_DOMAINS } from '../graphql/domains';

@Module({ dynamic: true, store, name: 'domains', namespaced: true })
export class Domains extends VuexModule {
  loaded = false;

  get domain() {
    return Domain;
  }

  get types() {
    return ActivityType;
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async load() {
    const { domainMany, activityTypeMany } = await gqlHttp(LOAD_DOMAINS);
    await Domain.insertOrUpdate({ data: domainMany });
    await ActivityType.insertOrUpdate({ data: activityTypeMany });
    return true;
  }

  @Mutation
  private LOAD_COMPLETE() {
    this.loaded = true;
  }
}

export const DomainsModule = getModule(Domains);
