import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from '@libs/auth-vue';
import { teraStore } from '@libs/tera-core';

const modules = {
  auth,
  teraStore
};

Vue.use(Vuex);

export default new Vuex.Store({ modules });
