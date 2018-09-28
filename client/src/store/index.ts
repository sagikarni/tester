import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from '@/modules/auth';
import { activities } from '@/modules/activities';
import { app } from './app.module';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    systemLoading: null,
    generalGerror: null,
    errorPane: null,
    reloadActivityDetails: null,
    isHDMedia: null,
    isFullScreen: null,
  },
  modules: {
    auth,
    activities,
  } as any,

  actions: app.actions,
  mutations: app.mutations,

});
