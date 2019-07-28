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
import {
  LOAD_BOARDS,
  BOARD_CREATE_ITEM_ONE,
  BOARD_CREATE_ONE,
  BOARD_REMOVE_ONE,
  BOARD_REMOVE_ITEM_ONE,
  BOARD_RENAME_ONE,
} from '../graphql/board';

@Module({ dynamic: true, store, name: 'board', namespaced: true })
export class Boards extends VuexModule {
  loaded = false;

  get board() {
    return Board;
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async load() {
    if (this.loaded) return;
    const { boardMany } = await gqlHttp(LOAD_BOARDS);
    return await Board.insertOrUpdate({ data: boardMany });
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async boardCreateOne({ name }) {
    const { boardCreateOne } = await gqlHttp(BOARD_CREATE_ONE, { name });
    return await Board.insertOrUpdate({ data: boardCreateOne });
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async boardCreateItemOne({ id, item }) {
    const { boardCreateItemOne } = await gqlHttp(BOARD_CREATE_ITEM_ONE, {
      id,
      item,
    });
    return await Board.insertOrUpdate({ data: boardCreateItemOne });
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async boardRemove({ id }) {
    const { boardRemoveOne } = await gqlHttp(BOARD_REMOVE_ONE, { id });
    return await Board.delete(id);
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async boardRemoveItemOne({ id, item }) {
    const { boardRemoveItemOne } = await gqlHttp(BOARD_REMOVE_ITEM_ONE, {
      id,
      item,
    });
    return await Board.insertOrUpdate({ data: boardRemoveItemOne });
  }

  @Action({ commit: 'LOAD_COMPLETE' })
  public async boardRenameOne({ id, name }) {
    const { boardRenameOne } = await gqlHttp(BOARD_RENAME_ONE, { id, name });
    return await Board.insertOrUpdate({ data: boardRenameOne });
  }

  @Mutation
  private LOAD_COMPLETE() {
    this.loaded = true;
  }
}

export const BoardsModule = getModule(Boards);
