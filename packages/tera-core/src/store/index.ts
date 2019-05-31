import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';

import * as fromEntities from './entities';

import { IAppState } from './app';
export interface IRootState {
  app: IAppState;
}

Vue.use(Vuex);

const database = new VuexORM.Database();

Object.keys(fromEntities).forEach((entity) =>
  database.register(fromEntities[entity])
);

const store = new Vuex.Store<IRootState>({
  plugins: [VuexORM.install(database)],
});

export default store;
