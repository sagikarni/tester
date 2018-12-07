import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from '@libs/auth/store';
import { teraStore } from '@libs/core/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    teraStore
  }
});
