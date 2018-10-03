import Vue from 'vue';
import Vuex from 'vuex';

import { actions, mutations, state } from '@libs/tera-store';
import { auth, StoreTokenInterceptorPlugin } from '@libs/vue-auth';
import { activities } from '@libs/tera-activities';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    auth,
    activities,
  },
  plugins: [StoreTokenInterceptorPlugin],
});
