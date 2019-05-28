import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store';

import { Strip } from './entities';
import { gqlHttp } from '../plugins/gql-http';
import { LOAD_STRIPS } from '../graphql/strips';

@Module({ dynamic: true, store, name: 'strips', namespaced: true })
export class Strips extends VuexModule {
  loaded = false;

  get strip() {
    return Strip;
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async load() {
    const { stripsMany } = await gqlHttp(LOAD_STRIPS);
    return await Strip.insertOrUpdate({ data: stripsMany });
  }

  @Mutation
  private LOAD_COMPLETE() {
    this.loaded = true;
  }
}

export const StripsModule = getModule(Strips);
