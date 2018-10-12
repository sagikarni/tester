import Vue from 'vue';
import Vuex from 'vuex';

import { app } from '@libs/tera-store';
import { auth, StoreTokenInterceptorPlugin } from '@libs/vue-auth';
import { activities } from '@libs/tera-activities';
import { translation } from './store-trans';

Vue.use(Vuex);

export default new Vuex.Store({
  // state,
  // mutations,
  // actions,
  modules: {
    app,
    translation,
    auth,
    activities
  },
  plugins: [StoreTokenInterceptorPlugin]
});
