import Vue from 'vue';
import Vuex from 'vuex';

import { auth, StoreTokenInterceptorPlugin } from '@/modules/auth';
import { activities } from '@/modules/activities';
import { state, actions, mutations } from './root';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state,

  modules: {
    auth,
    activities,
  } as any,

  actions,
  mutations,

  plugins: [StoreTokenInterceptorPlugin],
});
