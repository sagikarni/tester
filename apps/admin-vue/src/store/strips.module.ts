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
import { LOAD_STRIPS, UPSERT_STRIP } from '../graphql/strips';

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

  @Action({ commit: 'UPSERT_STRIP' })
  async add({ strip }) {
    const { stripsUpdateOrCreate } = await gqlHttp(UPSERT_STRIP, {
      collections: strip,
    });

    return { strip: stripsUpdateOrCreate };
  }

  @Action({ commit: 'NEW_STRIP' })
  async addNew() {
    return true;
  }

  @Mutation
  private LOAD_COMPLETE() {
    this.loaded = true;
  }

  @Mutation
  private async UPSERT_STRIP({ strip }) {
    await Strip.insertOrUpdate({
      data: strip.map((s) => ({ ...s, new: null })),
    });
  }

  @Mutation
  private async NEW_STRIP() {
    const t = (await Strip.new()) as any;
    t.new = true;
  }
}

export const StripsModule = getModule(Strips);
