import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store';

import { Articulation } from './entities';
import { gqlHttp } from '../plugins/gql-http';
import {
  LOAD_ARTICULATIONS,
  UPSERT_ARTICULATION,
} from '../graphql/articulation';

@Module({ dynamic: true, store, name: 'articulation', namespaced: true })
export class Articulations extends VuexModule {
  loaded = false;

  get articulation() {
    return Articulation;
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async load() {
    const { articulationMany } = await gqlHttp(LOAD_ARTICULATIONS);
    return await Articulation.insertOrUpdate({ data: articulationMany });
  }

  @Action({ commit: 'UPSERT_ARTICULATION' })
  async add({ articulation }) {
    const { articulationUpdateOrCreate } = await gqlHttp(UPSERT_ARTICULATION, {
      record: articulation,
    });

    return { activity: articulationUpdateOrCreate.record };
  }

  @Mutation
  private LOAD_COMPLETE() {
    this.loaded = true;
  }

  @Mutation
  private async UPSERT_ARTICULATION({ articulation }) {
    await Articulation.insertOrUpdate({ data: articulation });
  }
}

export const ArticulationsModule = getModule(Articulations);
