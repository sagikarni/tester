import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from 'auth-vue';
import { teraStore } from 'tera-core';

const modules = {
  auth,
  teraStore
};

Vue.use(Vuex);

export default new Vuex.Store({ modules });
