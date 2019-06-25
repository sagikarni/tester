import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from './index';

import { Board } from './entities';
import { gqlHttp } from '../gql-http';
import { LOAD_BOARDS } from '../graphql/board';

@Module({ dynamic: true, store, name: 'board', namespaced: true })
export class Boards extends VuexModule {
  loaded = false;

  get board() {
    return Board;
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async load() {
    const { boardMany } = await gqlHttp(LOAD_BOARDS);
    return await Board.insertOrUpdate({ data: boardMany });
  }

  @Mutation
  private LOAD_COMPLETE() {
    this.loaded = true;
  }
}

export const BoardsModule = getModule(Boards);
