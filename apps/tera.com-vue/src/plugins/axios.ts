import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { AuthModule } from 'tera-core/src/store/auth-tera.module';

axios.interceptors.request.use((config) => {
  if (AuthModule.token) {
    config.headers['Authorization'] = `bearer ${AuthModule.token}`;
  }
  return config;
});

Vue.use(VueAxios, axios);
