import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from './index';

import { Plan } from './entities';
import { gqlHttp } from '../gql-http';
import { LOAD_PLANS } from '../graphql/plans';

@Module({ dynamic: true, store, name: 'plan', namespaced: true })
export class Plans extends VuexModule {
  loaded = false;

  get plan() {
    return Plan;
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async load() {
    if (this.loaded) return;
    const { planMany } = await gqlHttp(LOAD_PLANS);
    return await Plan.insertOrUpdate({ data: planMany });
  }

  @Mutation
  private LOAD_COMPLETE() {
    this.loaded = true;
  }
}

export const PlansModule = getModule(Plans);
